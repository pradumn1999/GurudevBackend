const Shipping = require('../models/shippingModel');

exports.saveShippingData = async (req, res) => {
  try {
    const shippingData = new Shipping(req.body);
    const savedData = await shippingData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
