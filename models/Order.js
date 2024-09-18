const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  books: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
