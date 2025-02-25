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
      subject: `!!Testing!! New Website Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
      <div style="margin: 0; padding: 20px; box-sizing: border-box; width: 100%; background-image: url(/backend/Images/bg.jpg); background-size: cover;">
        <div style="margin: 0 auto; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 80%;">
            <p style="display: flex; flex-direction: row; align-items: center; font-size: 24px; letter-spacing: 2px; font-weight: 600;"><img style="width: 75px; aspect-ratio: 1/1;" src="/backend/Images/Logo-black.png" alt="Logo">Goldstern</p>
        </div>
        <div style="margin: 0 auto; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 80%;">
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; margin-bottom: 30px; ">Hi Team,</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">We received a new inquiry from ${name}</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">Email: ${email}</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">Message:</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">${message}</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; margin-top: 50px;">Best of luck,</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">Goldstern</p>
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
      <div style="margin: 0; padding: 20px; box-sizing: border-box; width: 100%; background-image: url(/backend/Images/bg.jpg); background-size: cover;">
        <div style="margin: 0 auto; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 80%;">
            <p style="display: flex; flex-direction: row; align-items: center; font-size: 24px; letter-spacing: 2px; font-weight: 600;"><img style="width: 75px; aspect-ratio: 1/1;" src="/backend/Images/Logo-black.png" alt="Logo">Goldstern</p>
        </div>
        <div style="margin: 0 auto; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; width: 80%;">
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; margin-bottom: 30px; ">Hi ${name},</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">Thanks for reaching out to us! We've received your message and our team is already on it. We'll be in touch soon!</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">We're excited to connect with you and will get back to you as quickly as possible.</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1;  margin-top: 30px;">Best regards,</p>
            <p style="font-size: 18px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1; ">Goldstern</p>
            <hr style="margin: 50px 0px;">
            <p style="font-size: 14px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1;">&copy; Goldstern 2025</p>
            <p style="font-size: 14px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1;">Sodic portal A office 311, Second Al Sheikh Zayed, Giza Governorate</p>
            <p style="font-size: 14px; font-weight: 700; color: #5f5f5f; letter-spacing: 1.5px; line-height: 1;">Follow us on <a href="https://www.tiktok.com/@goldstern.eg">TikTok</a>, <a href="https://www.facebook.com/profile.php?id=61552608263446">Facebook</a>, and <a href="https://www.instagram.com/goldstern_eg">Instagram</a></p>
        </div>
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
