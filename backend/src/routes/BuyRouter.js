const express = require('express');
const router = express.Router();
const controller = require('../controllers/BuyController');
router.post('/', controller.createNewPurchaseOrder)
router.post('/', controller.updatePages)
module.exports = router;
