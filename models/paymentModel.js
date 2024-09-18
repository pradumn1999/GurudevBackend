import mongoose from 'mongoose';

// Define the schema for payment data
const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  paymentMethodNonce: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
