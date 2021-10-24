const User = require('../models/user');
const createError = require('http-errors');

exports.login = (req, res, next) => {
    const { userName, password } = req.body;
    User.findOne({ userName })
        .then((user) => {
            if (!user || !user.checkPassword(password)) {
                throw createError(401, 'Incorrect username or password!');
            }
            res.json(user.signJWT());
        })
        .catch(next);
};

exports.register = (req, res, next) => {
    let data = ({ name, userName, password } = req.body);
    User.create(data)
        .then((user) => {
            res.json(user.signJWT());
            sedNewUser(user);
        })
        .catch(next);
};

exports.find = (req, res, next) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    User.findByIdAndRemove({ _id: req.params.id })
        .then(() => {
            res.json('User deleted!');
        })
        .catch((err) => {
            console.log(err);
        });
};

const sedNewUser = (user) => {
    let data = ({ name, userName, avatar } = user);
    io.emit('new_user', data);
};
