const braintree = require('braintree');
require('dotenv').config();

// Initialize Braintree gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,  // Sandbox या Production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate Braintree Client Token
exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send({ error: 'Failed to generate client token', details: err });
    } else {
      res.status(200).send({ clientToken: response.clientToken });
    }
  });
};

// Process Payment
exports.processPayment = (req, res) => {
  const { paymentMethodNonce, amount } = req.body;

  // Ensure that amount and paymentMethodNonce are provided
  if (!paymentMethodNonce || !amount) {
    return res.status(400).json({ error: 'Payment method nonce and amount are required' });
  }

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: paymentMethodNonce,
    options: {
      submitForSettlement: true,  // Immediate settlement
    },
  }, (err, result) => {
    if (err || !result.success) {
      return res.status(500).send({ error: 'Payment processing failed', details: err });
    } else {
      res.status(200).json({ success: true, transaction: result.transaction });
    }
  });
};
