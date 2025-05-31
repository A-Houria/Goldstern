const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, phone, car, message } = JSON.parse(event.body);

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
                  <p style="letter-spacing: 1.5px; line-height: 1.5;"><strong>Customer's Phone:</strong> ${phone}</p>
              </li>
              <li>
                  <p style="letter-spacing: 1.5px; line-height: 1.5;"><strong>Requested Car:</strong> ${car}</p>
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
        We've received your inquiry. Our dedicated sales team is already on it and will be reaching out to you shortly. We truly appreciate your interest and are excited to assist you with your needs!
        </p>
        <p style="letter-spacing: 1.5px; line-height: 1.5;">
        In the meantime, feel free to explore our website for more information about our services and offerings.
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
            <a  href="https://www.linkedin.com/company/103967635" style="cursor: pointer; text-decoration: none; color: transparent;">
                <img style="max-width: 35px; margin: 0px 20px;" src="https://goldsternonline.de/Icons/LinkedIn.png" alt="tiktok">
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
