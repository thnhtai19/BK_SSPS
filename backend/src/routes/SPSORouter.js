const express = require("express");
const router = express.Router();
const SPSOController = require('../controllers/SPSOController');

router.put('/update_status', SPSOController.updateStatus);
router.get('/student', SPSOController.student_manager);
router.get('/getAllPrinter', SPSOController.getAllPrinter);
router.get('/report_list', SPSOController.reportList);
router.get('/report', SPSOController.report);
router.get('/getAllPrintOrder', SPSOController.getAllPrintOrder);
router.get('/adminHomePage', SPSOController.adminHomPage);
router.post('/updatePrintOrderStatus', SPSOController.UpdatePrintOrderStatus);
router.post('/updatePrinterStatus', SPSOController.UpdatePrinterStatus);
router.post('/addPrinter', SPSOController.AddPrinter);
router.get('/systemInfo', SPSOController.getSystemInfo);
router.post('/addNewSemester', SPSOController.addNewSemester);
router.post('/updateSystem', SPSOController.updateSystem);

module.exports = router