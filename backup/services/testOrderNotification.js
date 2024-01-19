const { handleOrderNotification } = require("./emailService");

// Mock order data
const mockOrderData = {
  customer: {
    firstName: "Ezaco",
    lastName: "Antonio",
    email: "principepasti@gmail.com", // Replace with your test customer email
    phone: "647-123-4567",
  },
  tireDetails: [
    {
      tireId: "12345",
      brand: "Test Brand",
      size: "225/45R17",
      treadCondition: "80%",
      location: "Test Location",
      setInfo: "Set of 4",
      season: "All-Season",
      price: 100,
    },
  ],
  _id: "testorder123",
  orderDate: new Date().toISOString(),
};

// Function to simulate order notification
async function testOrderNotification() {
  try {
    await handleOrderNotification(mockOrderData);
    console.log("Order notification test completed.");
  } catch (error) {
    console.error("Order notification test failed:", error);
  }
}

testOrderNotification();
