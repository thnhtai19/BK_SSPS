const express = require("express");
const router = express.Router();
const SPSOController = require('../controllers/SPSOController');

router.get('/getAllPrinter', SPSOController.getAllPrinter);
router.post('/updatePrinterStatus', SPSOController.UpdatePrinterStatus);
router.post('/addPrinter', SPSOController.AddPrinter);
router.get('/getAllPrintOrder', SPSOController.getAllPrintOrder);
router.post('/updatePrintOrderStatus', SPSOController.UpdatePrintOrderStatus);

module.exports = router