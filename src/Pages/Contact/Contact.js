import Style from "../../styles/Contact/Contact.module.css";

import { Helmet } from "react-helmet";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    car: "",
    message: "",
  });

  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let input = value;

      // Ensure it starts with "+20"
      if (!input.startsWith("+20")) {
        input = "+20" + input.replace(/^\+?20?/, "");
      }

      // Strip non-digits after +20
      const digits = input.slice(3).replace(/\D/g, "");

      // Limit to 10 digits after +20
      const formatted = "+20" + digits.slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!formData.phone.startsWith("+20")) {
      setFormData((prev) => ({ ...prev, phone: "+20" }));
    }
  };

  const handleBlur = () => {
    if (formData.phone === "+20") {
      setFormData((prev) => ({ ...prev, phone: "" }));
      setIsFocused(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      car: formData.car,
      message: formData.message,
    };

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          car: "",
          message: "",
        });
        setIsFocused(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Goldstern",
    url: "https://goldsternonline.de",
    logo: "https://goldsternonline.de/logo.webp",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+20-10-00445786",
        contactType: "customer service",
        areaServed: "EG",
        availableLanguage: ["English", "German", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+20-10-00445786",
        contactType: "sales",
        areaServed: "EG",
        availableLanguage: ["English", "German", "Arabic"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Makan Mall, Waslet Dahshur Rd",
      addressLocality: "Second Al Sheikh Zayed",
      addressRegion: "Giza Governorate",
      addressCountry: "EG",
    },
  };

  return (
    <div className={Style.contact}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>
      <div className={Style.cont}>
        <div className={Style.main}>
          <div className={Style.text}>
            <h1>Contact US</h1>
            <div className={Style.line}></div>
            <p>Reach out to us for any inquiry</p>
            <form className={Style.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                pattern="\[1-9][0-9]{9}"
                title="Phone number must start with +20 and be followed by 10 digits"
                placeholder={isFocused ? "" : "Phone Number"}
                required
              />
              <input
                type="text"
                name="car"
                placeholder="Requested Car"
                value={formData.car}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <input className={Style.btn} type="submit" value="Submit" />
              {status && <p>{status}</p>}
            </form>
          </div>
          <div className={Style.map}>
            <iframe
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8626251711094!2d30.952414111132747!3d30.040798774820875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145859dff6b9c047%3A0x452cc613a0ce1844!2zR29sZHN0ZXJuIC0g2KzZiNmE2K_YtNiq2LHZhg!5e0!3m2!1sen!2sde!4v1748620027312!5m2!1sen!2sde"
              width="600"
              height="450"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className={Style.icons}>
          <div className={Style.card}>
            <img loading="lazy" src="./Icons/location.webp" alt="Location" />
            <div className={Style.details}>
              <h1>Location</h1>
              <p>
                Goldstern: Makan Mall, Waslet Dahshur Rd, Second Al Sheikh
                Zayed, Giza Governorate.
              </p>
            </div>
          </div>
          <div className={Style.card}>
            <img loading="lazy" src="./Icons/email.webp" alt="Email" />
            <div className={Style.details}>
              <h1>Email</h1>
              <p>info@goldsternonline.de</p>
            </div>
          </div>
          <div className={Style.card}>
            <img loading="lazy" src="./Icons/phone.webp" alt="Phone" />
            <div className={Style.details}>
              <h1>Phone</h1>
              <p>
                <span>
                  <img loading="lazy" src="./Icons/call.webp" alt="Phone" />
                </span>
                +20-10-00445786
              </p>
              <p>
                <span>
                  <img
                    loading="lazy"
                    src="./Icons/whatsapp.webp"
                    alt="Whatsapp"
                  />
                </span>
                +20-10-00445786
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
