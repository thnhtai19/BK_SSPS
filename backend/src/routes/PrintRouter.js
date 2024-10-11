const express = require("express");
const router = express.Router();
const controller = require('../controllers/PrintController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' })
router.post('/printConfirm', controller.printConfirm);
router.post('/uploadFile', upload.single('file'), controller.uploadFile);
module.exports = router