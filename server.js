const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  // Braintree routes
const shippingRoutes = require('./routes/shippingRoutes'); // Shipping routes
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Allowed origins for CORS (list trusted domains)
// const allowedOrigins = ['https://gurudev-frontend-gamma.vercel.app'];

// CORS configuration to allow requests from specific origins

app.use(cors({
  origin: ["https://gurudev-frontend-gamma.vercel.app"] || "*", // Add your frontend URL or use '*' for all
  credentials: true
}));

// app.use(cors({
//   origin: function (origin, callback) {
//     // Logging the request origin for debugging
//     console.log("Request Origin: ", origin);

//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);  // Allow request
//     } else {
//       console.log("CORS error: Origin not allowed: ", origin);
//       callback(new Error('Not allowed by CORS'));  // Block request
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true // Allow credentials (cookies, authorization headers)
// }));

// Enable pre-flight for all routes
// app.options('*', (req, res) => {
//   const origin = req.headers.origin;

//   // Logging for pre-flight request handling
//   console.log("Pre-flight Request from: ", origin);

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);  // Only allow the origin if it's in the list
//   }

//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(200);  // Send HTTP OK status for preflight requests
// });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
