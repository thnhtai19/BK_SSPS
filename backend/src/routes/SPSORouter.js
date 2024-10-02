const express = require("express");
const router = express.Router();
const SPSOController = require('../controllers/SPSOController');

router.put('/update_status', SPSOController.updateStatus);
router.get('/student', SPSOController.student_manager);
router.get('/getAllPrinter', SPSOController.getAllPrinter);
router.post('/updatePrinterStatus', SPSOController.UpdatePrinterStatus);
router.post('/addPrinter', SPSOController.AddPrinter);
router.get('/getAllPrintOrder', SPSOController.getAllPrintOrder);
router.post('/updatePrintOrderStatus', SPSOController.UpdatePrintOrderStatus);

module.exports = router