const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  tireDetails: [
    {
      tireId: mongoose.Schema.Types.ObjectId, // Reference to the Tire
      brand: String,
      size: String,
      treadCondition: String,
      location: String,
      setInfo: String,
      season: String,
      price: Number,
      // Other tire details as required, matching the Tire model
    },
  ],
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "canceled"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // Include more fields as necessary
});

module.exports = mongoose.model("Order", orderSchema);
