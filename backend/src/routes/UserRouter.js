const express = require("express");
const router = express.Router();
const controller = require('../controllers/UserController');
router.get('/profile', controller.getUserInforById);
module.exports = router
