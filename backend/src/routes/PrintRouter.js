const express = require("express");
const router = express.Router();
const controller = require('../controllers/PrintController');
router.post('/printConfirm', controller.printConfirm);
module.exports = router