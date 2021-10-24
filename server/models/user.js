const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ModelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        maxLength: 100,
    },
    avatar: String,
});

/**
 * Pre save middleware (before save user document).
 * @param next
 */
ModelSchema.pre('save', function (next) {
    if (this.isNow || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

/**
 * Get user profile data.
 */
ModelSchema.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        userName: this.userName,
        about: this.about,
        avatar: this.avatar,
    };
};

/**
 * Generate user token with profile data.
 */
ModelSchema.methods.signJWT = function () {
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

/**
 * Check if given password is correct.
 * @param password
 */
ModelSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Append id attribute.
 */
ModelSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

/**
 * Enable virtual attributes (id).
 */
ModelSchema.set('toJSON', {
    virtuals: true,
});

const Model = mongoose.model('User', ModelSchema);

module.exports = Model;
