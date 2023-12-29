const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tireRoutes = require('./routes/tires');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb+srv://appuser:appuser@cluster0.dgrqmgc.mongodb.net/hw-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/tires', tireRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
