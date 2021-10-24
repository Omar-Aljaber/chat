require('dotenv/config');
require('./socket-handler');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/account', require('./routes/account'));

app.use((err, req, res, next) => {
    if (req.get('accept').includes('json')) {
        return next(createError(404));
    }
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    if (
        err.name === 'MongoError' ||
        err.name === 'ValidationError' ||
        err.name === 'CastError'
    ) {
        err.status = 422;
    }
    res.status(err.status || 5000).json({
        message: err.message || 'some error eccured!',
    });
});

mongoose.connect(process.env.DB_URL, (err) => {
    if (err) throw err;
    console.log('Connected successfully!');
});

module.exports = app;
