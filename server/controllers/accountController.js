const createError = require('http-errors');

/**
 * Update user profile.
 * @param req
 * @param res
 * @param next
 */
exports.profile = (req, res, next) => {
    const user = req.user;
    user.name = req.body.name;
    user.about = req.body.about;
    user.avatar = req.file ? req.file.filename : user.avatar;
    user.save()
        .then((updated) => {
            sendUpdateUser(updated);
            res.json();
        })
        .catch(next);
};

/**
 * Broadcast the profile changes to users.
 * @param user
 */
const sendUpdateUser = (user) => {
    io.emit('update_user', user.getData());
};

/**
 * Change user password
 * @param req
 * @param res
 * @param next
 */
exports.password = (req, res, next) => {
    const { password, newPassword } = req.body;
    let user = req.user;
    if (!user.checkPassword(password)) {
        return next(createError(401, 'Incorrect Password!'));
    }
    user.password = newPassword;
    user.save()
        .then((updated) => res.json())
        .catch(next);
};
