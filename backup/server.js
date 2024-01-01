const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const tireRoutes = require('./routes/tires');

const app = express();

// Middleware for parsing JSON data
// app.use(express.json());
// const corsOptions = {
//   origin: 'https://hw-frontend1.vercel.app/', // Replace with your frontend's URL
//   optionsSuccessStatus: 200
// };

app.use(cors(corsOptions));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));
  

// Routes
app.use('/api/tires', tireRoutes);

// Choose a port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
