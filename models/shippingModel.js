const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: { // This should match the frontend field name
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Shipping', shippingSchema);
