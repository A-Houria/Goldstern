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
      <div style=" 
      margin:0; 
      padding: 15px;
      box-sizing: border-box;
      background-color: black;
      display: flex;
      align-items: center; 
      justify-content: center;">
        <img style="max-width: 100px;" src="https://goldsternonline.de/Icons/Logo.png" alt="Logo">
      </div>
      <div style="margin: 0 auto; padding: 25px; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 80%;">
          <p style="letter-spacing: 1.5px; line-height: 1.5;">Hey Team!</p>
          <p style="letter-spacing: 1.5px; line-height: 1.5;">We received a new inquiry from (${name}, ${email}) with the following details:</p>
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
      `,
    });


    // Send confirmation email to the customer
    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "We Received Your Inquiry!",
      html: ` 
<center style="background-color: black;">
<img style="max-width: 100px;" src="https://goldsternonline.de/Icons/Logo-black.png" alt="Logo">
</center>
<div style="
width: 80%;
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
<center style="background-color: black;">
<center>
<a href="">
    <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/facebook.png" alt="facebook">
</a>
<a href="">
    <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/instagram.png" alt="instagram">
</a>
<a href="">
    <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/tiktok.png" alt="tiktok">
</a>
</center>
<center style="background-color: black;">
<p style="padding: 0px 15px; letter-spacing: 1.5px; color: white;">Home</p>
<p style="padding: 0px 15px; letter-spacing: 1.5px; color: white;">About Us</p>
<p style="padding: 0px 15px; letter-spacing: 1.5px; color: white;">Car Inventory</p>
<p style="padding: 0px 15px; letter-spacing: 1.5px; color: white;">Services</p>
<p style="padding: 0px 15px; letter-spacing: 1.5px; color: white;">Contact</p>
</center>
</center>
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
