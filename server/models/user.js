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

ModelSchema.pre('save', function (next) {
    if (this.isNow || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

ModelSchema.methods.getData = function () {
    return {
        id: this._id,
        name: this.name,
        userName: this.userName,
        about: this.about,
        avatar: this.avatar,
    };
};

ModelSchema.methods.signJWT = function () {
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

ModelSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

ModelSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ModelSchema.set('toJSON', {
    virtuals: true,
});

const Model = mongoose.model('User', ModelSchema);

module.exports = Model;
