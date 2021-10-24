const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/', controller.login);
router.post('/delete/:id', controller.delete);
router.post('/register', controller.register);
router.get('/find', controller.find);

module.exports = router;
