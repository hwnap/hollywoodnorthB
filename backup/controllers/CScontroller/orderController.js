const Order = require("../../model/CSModel/Order");
const User = require("../../model/User");
const Tire = require("../../model/tire");

const { handleOrderNotification } = require("../../services/emailService"); // Update path as necessary

// Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     // Get the username and tireId from the request
//     const username = req.headers.username;
//     const tireId = req.body.tireId; // Assuming tireId is sent in the request body

//     // Fetch user details from the database
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Fetch tire details from the database
//     const tire = await Tire.findById(tireId);
//     if (!tire) {
//       return res.status(404).json({ message: "Tire not found" });
//     }

//     // Extract user contact information
//     const userContactInfo = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//     };

//     // Extract tire information
//     const tireInfo = {
//       tireId: tire._id,
//       brand: tire.brand,
//       size: tire.size,
//       treadCondition: tire.treadCondition,
//       location: tire.location,
//       setInfo: tire.setInfo,
//       season: tire.season,
//       price: tire.price,
//       // Include any other relevant tire details
//     };

//     // Combine user contact info and tire info to create the order
//     const orderData = {
//       customer: userContactInfo,
//       tireDetails: [tireInfo], // Assuming tireDetails is an array
//       status: "pending",
//     };

//     // Create a new order with the combined data
//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     // Include customer information in the response
//     const orderWithCustomer = {
//       ...newOrder._doc,
//       customer: userContactInfo,
//     };

//     res.status(201).json(orderWithCustomer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     // Get the username and tireId from the request
//     const username = req.headers.username;
//     const tireId = req.body.tireId; // Assuming tireId is sent in the request body

//     // Fetch user details from the database
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Fetch tire details from the database
//     const tire = await Tire.findById(tireId);
//     if (!tire) {
//       return res.status(404).json({ message: "Tire not found" });
//     }

//     // Extract user contact information
//     const userContactInfo = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//     };

//     // Extract tire information
//     const tireInfo = {
//       tireId: tire._id,
//       brand: tire.brand,
//       size: tire.size,
//       treadCondition: tire.treadCondition,
//       location: tire.location,
//       setInfo: tire.setInfo,
//       season: tire.season,
//       price: tire.price,
//       // Include any other relevant tire details
//     };

//     // Combine user contact info and tire info to create the order
//     const orderData = {
//       customer: userContactInfo,
//       tireDetails: [tireInfo], // Assuming tireDetails is an array
//       status: "pending",
//       orderDate: new Date(),
//     };

//     // Create a new order with the combined data
//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     // Send email notification
//     await handleOrderNotification(orderData);

//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get details of a specific order by ID
exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update details of a specific order by ID
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extract tireId from request body
    const { tireId } = req.body;

    // Extract username from request header
    const username = req.headers.username;

    // Fetch user details from the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch tire details from the database
    const tire = await Tire.findById(tireId);
    if (!tire) {
      return res.status(404).json({ message: "Tire not found" });
    }

    // Create the order data object
    const orderData = {
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      tireDetails: [
        {
          tireId: tire._id,
          brand: tire.brand,
          size: tire.size,
          treadCondition: tire.treadCondition,
          location: tire.location,
          setInfo: tire.setInfo,
          season: tire.season,
          price: tire.price,
        },
      ],
      orderDate: new Date(),
      status: "pending",
    };

    // Save the order to the database
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Send email notifications
    await handleOrderNotification(orderData);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}); // Fetch all orders
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
