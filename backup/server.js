const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const Tire = require('./model/tire');

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

// Routes
app.use('/api/tires', tireRoutes);
app.use('/api/tire-sales', tireSalesRoutes);
app.use('/api/users', userRoutes); // Add this line to integrate user routes

// Choose a port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

cron.schedule('0 0 * * *', async () => {
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
  await Tire.deleteMany({ status: 'sold', soldDate: { $lte: twoDaysAgo } });
  console.log('Deleted sold tires older than two days');
});

//Lists all sold tires every minute
// cron.schedule('* * * * *', async () => {
//     console.log('Running task every minute to check for sold tires.');

//     try {
//         // Fetch tires with status 'sold'
//         const soldTires = await Tire.find({ status: 'sold' });

//         if (soldTires.length > 0) {
//             console.log('Sold Tires:', soldTires);
//         } else {
//             console.log('No sold tires at the moment.');
//         }
//     } catch (error) {
//         console.error('Error fetching sold tires:', error);
//     }
// });
