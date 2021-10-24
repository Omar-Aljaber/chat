io = require('socket.io')();
const auth = require('./middlewares/auth');
const Message = require('./models/message');
const User = require('./models/user');

const users = {};

io.use(auth.socket);

io.on('connection', (socket) => {
    onSocketConnected(socket);
    socket.on('message', (data) => onMessage(socket, data));
    socket.on('typing', (receiver) => onTyping(socket, receiver));
    socket.on('seen', (sender) => onSeen(socket, sender));
    initialData(socket);
    socket.on('disconnect', () => onSocketDisconnected(socket));
});

const onSocketConnected = (socket) => {
    console.log('New client connected: ' + socket.user.userName);
    socket.join(socket.user.id);
    users[socket.user.id] = true;
    let room = io.sockets.adapter.rooms[socket.user.id];
    if (!room || room.length === 1) {
        io.emit('user_status', {
            [socket.user.id]: true,
        });
    }
};

const onSocketDisconnected = (socket) => {
    let room = io.sockets.adapter.rooms[socket.user.id];
    if (!room || room.length < 1) {
        let lastSeen = new Date().getTime();
        users[socket.user.id] = lastSeen;
        io.emit('user_status', {
            [socket.user.id]: lastSeen,
        });
    }
    console.log('Clinet disconncted: ' + socket.user.userName);
};

const onMessage = (socket, data) => {
    let sender = socket.user.id;
    let receiver = data.receiver;
    let message = {
        sender: sender,
        receiver: receiver,
        content: data.content,
        date: new Date().getTime(),
    };
    Message.create(message);
    socket.to(receiver).to(sender).emit('message', message);
};

const onTyping = (socket, receiver) => {
    let sender = socket.user.id;
    socket.to(receiver).emit('typing', sender);
};

const onSeen = (socket, sender) => {
    let receiver = socket.user.id;
    Message.updateMany(
        { sender, receiver, seen: false },
        { seen: true },
        { multi: true }
    ).exec();
};

const getMessage = (userId) => {
    let where = [{ sender: userId }, { receiver: userId }];
    return Message.find().or(where);
};

const getUser = (userId) => {
    let where = {
        _id: { $ne: userId },
    };
    return User.find(where).select('-password');
};

const initialData = (socket) => {
    let user = socket.user;
    let messages = [];
    getMessage(user.id)
        .then((data) => {
            messages = data;
            return getUser(user.id);
        })
        .then((contacts) => {
            socket.emit('data', user, contacts, messages, users);
        })
        .catch(() => socket.disconnect());
};
