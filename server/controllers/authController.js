const User = require('../models/user');
const createError = require('http-errors');

/**
 * Login.
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    const { userName, password } = req.body;
    User.findOne({ userName })
        .then((user) => {
            // if user not found or password is wrong then create error.
            if (!user || !user.checkPassword(password)) {
                throw createError(401, 'Incorrect username or password!');
            }
            // Generate user token.
            res.json(user.signJWT());
        })
        .catch(next);
};

/**
 * Register.
 * @param req
 * @param res
 * @param next
 */
exports.register = (req, res, next) => {
    let data = ({ name, userName, password } = req.body);
    // Check if username already exist.
    User.create(data)
        .then((user) => {
            // Generate user token.
            res.json(user.signJWT());
            // Broadcast created user profile to users.
            sedNewUser(user);
        })
        .catch(next);
};

/**
 * Find all users.
 * @param req
 * @param res
 * @param next
 */
exports.find = (req, res, next) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

/**
 * Delete.
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {
    User.findByIdAndRemove({ _id: req.params.id })
        .then(() => {
            res.json('User deleted!');
        })
        .catch(next);
};

/**
 * Broadcast created user profile to users.
 * @param user
 */
const sedNewUser = (user) => {
    let data = ({ name, userName, avatar } = user);
    io.emit('new_user', data);
};
