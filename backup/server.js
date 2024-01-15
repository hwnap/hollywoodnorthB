const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const Tire = require('./model/tire');

// Import the new routes
const classicCarRoutes = require('./routes/cciroutes/classicCar');
const categoryRoutes = require('./routes/cciroutes/category');
const fileRoutes = require('./routes/cciroutes/file');
const searchRoutes = require('./routes/cciroutes/search');

const tireRoutes = require('./routes/tires');
const tireSalesRoutes = require('./routes/tireSales');
const userRoutes = require('./routes/userRoutes'); // User routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://hw-frontend1.onrender.com'
}));

// Middleware for parsing JSON data
app.use(express.json());

// Existing Routes
app.use('/api/tires', tireRoutes);
app.use('/api/tire-sales', tireSalesRoutes);
app.use('/api/users', userRoutes);

// New Routes for Classic Cars, Categories, and Files
app.use('/api/classic-cars', classicCarRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/search', searchRoutes);


// Choose a port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Existing cron job for tire management
cron.schedule('0 0 * * *', async () => {
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
  await Tire.deleteMany({ status: 'sold', soldDate: { $lte: twoDaysAgo } });
  console.log('Deleted sold tires older than two days');
});

// Error handling for undefined routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});
