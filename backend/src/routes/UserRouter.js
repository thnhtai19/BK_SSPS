const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/diary', UserController.diary);
router.get('/ls_mua', UserController.history_buying);
router.get('/profile', UserController.UserInfo);
router.get('/StudentHomepage', UserController.studentHomepage);
router.get('/AcceptedDocumentAndPrinterInfo', UserController.getDocumentAndPrinterInfo);
router.get('/printOrder', UserController.getPrintOrder);
router.get('/printOrder/NoPagesEachDay', UserController.getNoPagesEachDay);
router.post('/buy', UserController.Buy);
router.get('/getFile', UserController.getFile);

module.exports = router