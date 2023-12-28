const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://appuser:appuser@cluster0.dgrqmgc.mongodb.net/hw-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            poolSize: 10, // Maintain up to 10 socket connections
            useFindAndModify: false, // Disable deprecated features
            useCreateIndex: true, // Use createIndex() instead of ensureIndex()
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
