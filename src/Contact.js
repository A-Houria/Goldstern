import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your inquiry was sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("There was an issue sending your inquiry.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your inquiry.");
    }
  };

  return (
    <div className="contact">
      <div className="contact-us">
        <form onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <p>We will get in touch shortly</p>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="message">Your Inquiry</label>
            <textarea
              required
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="team">
        <h1>Our Team</h1>
        <div className="cards">
          <div className="card">
            <img src="/Icons/Logo-black.png" alt="profile image" />
            <div className="line"></div>
            <p>Abdelrahman Houria</p>
            <p>General Manager</p>
            <p>28 Years old</p>
          </div>
          <div className="card">
            <img src="/Icons/Logo-black.png" alt="profile image" />
            <div className="line"></div>
            <p>Mostafa Shafiee</p>
            <p>General Manager</p>
            <p>28 Years old</p>
          </div>
          <div className="card">
            <img src="/Icons/Logo-black.png" alt="profile image" />
            <div className="line"></div>
            <p>Abdelrahman Houria</p>
            <p>General Manager</p>
            <p>28 Years old</p>
          </div>
          <div className="card">
            <img src="/Icons/Logo-black.png" alt="profile image" />
            <div className="line"></div>
            <p>Mostafa Shafiee</p>
            <p>General Manager</p>
            <p>28 Years old</p>
          </div>
        </div>
      </div>
      <div className="details">
      <div className="wrap"></div>
        <div className="contact-details">
          <div className="phone">
            <h1>call us or send a message on whatsapp</h1>
            <p>
              <img src="/Icons/phone-num.png" alt="phone" />
              +20 12 3456 7891
            </p>
            <p>
              <img src="/Icons/whatsapp.png" alt="whatsapp" />
              +20 12 3456 7891
            </p>
          </div>
          <div className="social-media">
            <h1>follow us on social media</h1>
            <div className="imgs">
              <a
                href="https://www.facebook.com/profile.php?id=61552608263446"
                target="_blank">
                <img src="/Icons/facebook-colored.png" alt="facebook" />
              </a>
              <a href="https://www.instagram.com/goldstern_eg/" target="_blank">
                <img src="/Icons/instagram-colored.png" alt="instagram" />
              </a>
              <a href="https://www.tiktok.com/@goldstern.eg" target="_blank">
                <img src="/Icons/tiktok-colored.png" alt="tiktok" />
              </a>
            </div>
          </div>
        </div>
        <div className="map">
          <h1>or you can visit our office</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.781725146643!2d30.941566911133943!3d30.07179057480521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145859dff6b9c047%3A0x452cc613a0ce1844!2sGoldstern%20for%20cars%20import!5e0!3m2!1sen!2sde!4v1727536311185!5m2!1sen!2sde"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
