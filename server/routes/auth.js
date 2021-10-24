const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

/**
 * [POST] Login request.
 */
router.post('/', controller.login);

/**
 * [POST] Delete request.
 */
router.post('/register', controller.register);

/**
 * [POST] Register request.
 */
router.post('/delete/:id', controller.delete);

/**
 * [GET] FindAll request.
 */
router.get('/find', controller.find);

module.exports = router;
