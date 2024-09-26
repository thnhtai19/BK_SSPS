const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/diary', UserController.diary);

module.exports = router