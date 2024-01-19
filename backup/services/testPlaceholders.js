const fs = require("fs").promises;
const path = require("path");

// Assuming emailService.js is in the same directory as your test script
const { replaceTemplateStrings } = require("./emailService");

// Mock data
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

async function testPlaceholderReplacement() {
  try {
    // Update the path to the location of your HTML email template
    const emailTemplatePath = path.join(
      __dirname,
      "../templates/customerReciptTemplate.html"
    );
    const emailTemplate = await fs.readFile(emailTemplatePath, "utf8");

    const emailContent = replaceTemplateStrings(emailTemplate, mockOrderData);
    console.log(emailContent); // Output the modified HTML to the console
  } catch (error) {
    console.error("Error during test:", error);
  }
}

testPlaceholderReplacement();
