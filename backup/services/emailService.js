// emailService.js
const sgMail = require("@sendgrid/mail");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// Set your SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
SENDGRID_API_KEY1 = "SG.PTtpFNw5SjO_Nz710j7KRg._";
SENDGRID_API_KEY2 = "To8m5O3fYOd2yCTAK1QUhhAI65w2zCpPQjBtAxSFKM";
sgMail.setApiKey(SENDGRID_API_KEY1 + SENDGRID_API_KEY2);

// Function to replace placeholders in the template
function replaceTemplateStrings(template, data) {
  //console.log("Data received in replaceTemplateStrings:", data);
  let output = template;

  // Replace customer details
  output = output.replace(
    /\$\{customer\.firstName\}/g,
    data.customer.firstName
  );
  output = output.replace(/\$\{customer\.lastName\}/g, data.customer.lastName);
  output = output.replace(/\$\{customer\.email\}/g, data.customer.email);
  output = output.replace(/\$\{customer\.phone\}/g, data.customer.phone);

  // Check if tireDetails is available and not empty
  if (data.tireDetails && data.tireDetails.length > 0) {
    const tire = data.tireDetails[0];
    output = output.replace(/\$\{tire\.tireId\}/g, tire.tireId);
    output = output.replace(/\$\{tire\.brand\}/g, tire.brand);
    output = output.replace(/\$\{tire\.size\}/g, tire.size);
    output = output.replace(/\$\{tire\.treadCondition\}/g, tire.treadCondition);
    output = output.replace(/\$\{tire\.location\}/g, tire.location);
    output = output.replace(/\$\{tire\.setInfo\}/g, tire.setInfo);
    output = output.replace(/\$\{tire\.season\}/g, tire.season);
    output = output.replace(
      /\$\{tireTotalPrice\}/g,
      `${tire.price.toFixed(2)}`
    );
  }

  // Replace order ID and date
  output = output.replace(
    /\$\{data\.orderDate\}/g,
    new Date(data.orderDate).toLocaleString()
  );
  output = output.replace(/\$\{data\._id\}/g, data._id);
  //console.log("Output after replacements:", output);
  return output;
}

// Function to read HTML file
async function readHtmlFile(path) {
  try {
    return await fs.readFile(path, "utf8");
  } catch (error) {
    console.error("Error reading HTML file:", error);
    throw error;
  }
}

// Function to send email
async function sendEmail(emailData, recipientEmail, templatePath, subject) {
  if (!recipientEmail) {
    console.error("Recipient email address is not provided.");
    return;
  }

  try {
    const emailTemplate = await readHtmlFile(templatePath);
    const emailContent = replaceTemplateStrings(emailTemplate, emailData);

    const msg = {
      to: recipientEmail,
      from: "hwapTeams@gmail.com", // Replace with your verified sender email
      subject: subject,
      html: emailContent,
    };
    console.log("Sending email to:", recipientEmail);
    await sgMail.send(msg);
    console.log("Email sent successfully to " + recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Function to handle order notification
async function handleOrderNotification(orderData) {
  // Construct absolute paths for the email templates
  const teamEmailTemplatePath = path.join(
    __dirname,
    "../templates/orderEmailTemplate.html"
  );
  const customerEmailTemplatePath = path.join(
    __dirname,
    "../templates/customerReceiptTemplate.html"
  );
  // Email details for the team
  await sendEmail(
    orderData,
    "hollywoodnorthautopartsteam@gmail.com", // Replace with your team's email address
    teamEmailTemplatePath, // Use the absolute path for the team email template
    "New Order Received",
    console.log("Email sent successfully to team")
  );

  // Email details for the customer
  await sendEmail(
    orderData,
    orderData.customer.email, // Customer's email address from order data
    customerEmailTemplatePath, // Use the absolute path for the customer email template
    "Your Order Receipt"
  );
}

module.exports = {
  handleOrderNotification,
};
