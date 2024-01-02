const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Assuming you have a db.js for MongoDB connection

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const tireRoutes = require('./routes/tires');
const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://hw-frontend1.onrender.com' 
}));

// Middleware for parsing JSON data
app.use(express.json());

// Routes
app.use('/api/tires', tireRoutes);

// Choose a port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
