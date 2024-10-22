const express = require("express");
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.get('/get_payment/:id', PaymentController.getInfoPayment);
router.post('/create_payment', PaymentController.createPayment);

module.exports = router;