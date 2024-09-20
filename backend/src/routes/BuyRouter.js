const express = require('express');
const router = express.Router();
const controller = require('../controllers/BuyController');
router.put('/', controller.BuyPages);
