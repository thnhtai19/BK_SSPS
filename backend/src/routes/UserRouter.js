const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/diary', UserController.diary);
router.get('/profile', UserController.UserInfo);
router.get('/acceptedDocument', UserController.getAcceptedDocument);
router.get('/activePrinter', UserController.getActivePrinter);
router.get('/printOrder', UserController.getPrintOrder);
router.get('/printOrder/NoPagesEachDay', UserController.getNoPagesEachDay);
router.post('/upload', UserController.uploadDocument);
router.post('/buy', UserController.Buy);

module.exports = router