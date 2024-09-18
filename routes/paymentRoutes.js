// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { getToken, processPayment } = require('../controller/paymentController');

router.get('/token', getToken);
router.post('/checkout', processPayment);

module.exports = router;
