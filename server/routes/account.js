const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountController');
const auth = require('../middlewares/auth');

const path = require('path');
const multer = require('multer');

/**
 * Handel multipart/form-data.
 */
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

/**
 * User profile middleware.
 */
const upload = multer({
    limits: { fileSize: 1024 * 1024 },
    storage: storage,
    fileFilter: (req, file, cd) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimeType && extname) return cd(null, true);
        cd(new Error('This file can not be uploaded!'));
    },
});

/**
 * [POST] update profile.
 */
router.post(
    '/',
    [auth.authenticated, upload.single('avatar')],
    controller.profile
);

/**
 * [POST] Change password.
 */
router.post('/password', auth.authenticated, controller.password);

module.exports = router;
