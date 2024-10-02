const express = require("express");
const router = express.Router();
const SPSOController = require('../controllers/SPSOController');

router.put('/update_status', SPSOController.updateStatus);
router.get('/student', SPSOController.student_manager);
module.exports = router