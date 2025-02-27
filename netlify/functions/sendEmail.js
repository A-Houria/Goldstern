const nodemailer = require("nodemailer");

require("dotenv").config();

// Nodemailer transporter (Google)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL, // Your Google email
    pass: process.env.GOOGLE_PASSWORD, // Your Google password
  },
});

// Netlify function handler
exports.handler = async (event) => {
  // Ensure it's a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Send inquiry email to your inbox
    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: process.env.GOOGLE_EMAIL,
      replyTo: email,
      subject: `New Customer Inquiry Received From ${name}`,
      html: `
     <div style="width: 550px; margin: auto; border-bottom: 5px solid black; border-radius: 5px;">
    <center style="background-color: black;">
        <img style="max-width: 100px;" src="https://goldsternonline.de/Icons/Logo.png" alt="Logo">
      </center>
      <div style="margin: 0 auto; padding: 25px; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 100%;">
          <p style="letter-spacing: 1.5px; line-height: 1.5;">Hey Team!</p>
          <p style="letter-spacing: 1.5px; line-height: 1.5;">We received a new inquiry from ${name} with the following details:</p>
          <ul>
              <li>
                  <p style="letter-spacing: 1.5px; line-height: 1.5;"><strong>Customer's Name:</strong> ${name}</p>
              </li>
              <li>
                  <p style="letter-spacing: 1.5px; line-height: 1.5;"><strong>Customer's Email:</strong> ${email}</p>
              </li>
              <li>
                  <p style="letter-spacing: 1.5px; line-height: 1.5;"><strong>Customer's Message:</strong> ${message}</p>
              </li>
          </ul>
          <p style="letter-spacing: 1.5px; line-height: 1.5;">Thank you for your attention!</p>
      </div>
      </div>
</div>
      `,
    });


    // Send confirmation email to the customer
    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "We Received Your Inquiry!",
      html: `
      <div style="max-width: 550px; margin: auto;">
    <center style="background-color: black; padding: 20px;">
        <img style="width: 100px;" src="https://goldsternonline.de/Icons/Logo.png" alt="Logo">
    </center>
    <div style="
    width: 100%;
    margin: 0 auto;
    padding: 25px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;">
        <p style="letter-spacing: 1.5px; line-height: 1.5;">
        Hey ${name}!
        </p>
        <p style="letter-spacing: 1.5px; line-height: 1.5;">
        We're thrilled to let you know that we've received your inquiry at Your Company Name. Our dedicated sales team is already on it and will be reaching out to you shortly. We truly appreciate your interest and are excited to assist you with your needs!
        </p>
        <p style="letter-spacing: 1.5px; line-height: 1.5;">
        In the meantime, feel free to explore our website for more information about our services and offerings. We're here to ensure you have the best experience possible, and we can't wait to connect with you soon!
        </p>
        <p style="letter-spacing: 1.5px; line-height: 1.5;">
        Thank you for choosing us, and have a fantastic day!
        </p>
    </div>
    <center>
        <div style="background-color: black; margin: 0; padding: 20px; padding-top: 30px;">
            <a href="https://www.facebook.com/profile.php?id=61552608263446" style="cursor: pointer; text-decoration: none; color: transparent;">
                <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/facebook.png" alt="facebook">
            </a>
            <a href="https://www.instagram.com/goldstern_eg/" style="cursor: pointer; text-decoration: none; color: transparent;">
                <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/instagram.png" alt="instagram">
            </a>
            <a href="https://www.tiktok.com/@goldstern.eg" style="cursor: pointer; text-decoration: none; color: transparent;">
                <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/tiktok.png" alt="tiktok">
            </a>
        </div>
        <div style="background-color: black; background-color: black; margin: 0; padding-bottom: 30px;">
            <a href="https://goldsternonline.de/" target="_blank" style="text-decoration: none;">
                <p style="padding: 0px 15px; letter-spacing: 1.5px; color: white; display: inline;">Home</p>
            </a>
            <a href="https://goldsternonline.de/about" target="_blank" style="text-decoration: none;"> 
                <p style="padding: 0px 15px; letter-spacing: 1.5px; color: white; display: inline;">About Us</p>
            </a>
            <a href="https://goldsternonline.de/inventory" target="_blank" style="text-decoration: none;">
                <p style="padding: 0px 15px; letter-spacing: 1.5px; color: white; display: inline;">Car Inventory</p>
            </a>
            <a href="https://goldsternonline.de/services" target="_blank" style="text-decoration: none;"> 
                <p style="padding: 0px 15px; letter-spacing: 1.5px; color: white; display: inline;">Services</p>
            </a>
            <a href="https://goldsternonline.de/contact" target="_blank" style="text-decoration: none;">
                <p style="padding: 0px 15px; letter-spacing: 1.5px; color: white; display: inline;">Contact</p>
            </a>
        </div>
    </center>      
</div>
`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending emails:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending emails" }),
    };
  }
};
