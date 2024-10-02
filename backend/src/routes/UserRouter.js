const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/diary', UserController.diary);
router.get('/ls_mua', UserController.history_buying);

module.exports = router