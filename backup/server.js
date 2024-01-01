const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the database connection function

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const tireRoutes = require('./routes/tires');
const app = express();

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
