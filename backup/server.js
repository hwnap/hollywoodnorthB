const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const tireRoutes = require('./routes/tires');
const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

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
