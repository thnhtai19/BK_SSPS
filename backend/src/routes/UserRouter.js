const express = require("express");
const router = express.Router();
const controller = require('../controllers/UserController');
router.get('/profile', controller.UserInfo);
router.get('/acceptedDocument', controller.getAcceptedDocument);
router.get('/activePrinter', controller.getActivePrinter);
router.get('/printOrder', controller.getPrintOrder);
router.get('/printOrder/NoPagesEachDay', controller.getNoPagesEachDay);
router.post('/upload', controller.uploadDocument);
router.post('/buy', controller.Buy);
module.exports = router
