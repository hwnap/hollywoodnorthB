require("dotenv").config();
const { sendOrderEmail } = require("./emailService");

// Mock order data
const mockOrderData = {
  customer: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
  },
  tireDetails: [
    {
      tireId: "12345",
      brand: "Good Year",
      size: "225/45R17",
      treadCondition: "80%",
      location: "New York",
      setInfo: "Set of 4",
      season: "All-Season",
      price: 200,
    },
  ],
  _id: "order123",
  orderDate: new Date().toISOString(),
};

// Trigger the email sending function
sendOrderEmail(mockOrderData)
  .then(() => console.log("Test email sent successfully"))
  .catch((err) => console.error("Test email failed:", err));
