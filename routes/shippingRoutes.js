const express = require('express');
const { saveShippingData } = require('../controller/shippingController');

const router = express.Router();

// Route for shipping data
router.post('/', saveShippingData); // POST route for /api/shipping

module.exports = router;
