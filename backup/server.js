const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS package
const connectDB = require('./config/db'); // Import the database connection function

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const tireRoutes = require('./routes/tires');

const app = express();

// Enable CORS for requests from your frontend
app.use(cors({
    origin: 'https://hw-frontend1.onrender.com' // Replace with your frontend's URL
}));

// Middleware for parsing JSON data
app.use(express.json());

// Routes
app.use('/api/tires', tireRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
