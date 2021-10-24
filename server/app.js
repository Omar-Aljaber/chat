require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Include socket.io handler.
 */
require('./socket-handler');

const app = express();

/**
 * Express Middleware's.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/account', require('./routes/account'));

/**
 * Errors handling
 */
app.use((err, req, res, next) => {
    if (
        err.name === 'MongoError' ||
        err.name === 'ValidationError' ||
        err.name === 'CastError'
    ) {
        err.status = 422;
    }
    if (req.get('accept').includes('json')) {
        res.status(err.status || 500).json({
            message: err.message || 'some error eccured.',
        });
    } else {
        res.status(err.status || 500).sendFile(
            path.join(__dirname, 'public', 'index.html')
        );
    }
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, (err) => {
    if (err) throw err;
    console.log('Connected successfully!');
});

module.exports = app;
