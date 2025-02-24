import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/send-email", {
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

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const faqs = [
    {
      question: "How to import my car?",
      answer:
        "To import your car, you'll need to follow our process which includes paperwork, shipping logistics, and compliance checks to ensure smooth delivery.",
    },
    {
      question: "What are the costs involved?",
      answer:
        "The costs include the shipping fee, customs duties, and import taxes. We offer competitive pricing to help you save on all associated fees.",
    },
    {
      question: "How long does the import process take?",
      answer:
        "The entire import process takes approximately 3-6 weeks depending on the origin country and customs clearance times.",
    },
    {
      question: "Are there any restrictions on the type of cars I can import?",
      answer:
        "Yes, there are restrictions based on the car's age and emission standards. Our team will guide you through what's allowed in your region.",
    },
    {
      question: "How do I track my car during shipping?",
      answer:
        "We provide a tracking number once your car is shipped. You can track it online and we'll update you regularly about its status.",
    },
    {
      question: "Do you offer insurance for the car during shipment?",
      answer:
        "Yes, we offer comprehensive insurance options to cover any potential risks during the shipping process.",
    },
  ];

  return (
    <div className="services">
      <div className="service" data-aos="fade-up">
        <h1>Our Services</h1>
        <div className="services">
          <h1>1. Importing Your Car</h1>
          <h1>2. Importing Cars For Expats</h1>
          <h1>3. Specification Customization ( Factory Configuration) </h1>
          <h1>4. Guidance and Consultation</h1>
          <h1>5. After-Sales Support</h1>
        </div>
      </div>
      <div className="contact-us" data-aos="fade-up">
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
              type="message"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="import" data-aos="fade-up">
        <h1>Why Import with Us</h1>
        <div className="cards">
          <div className="card" data-aos="zoom-in">
            <h1>Cheapest Prices, No Middlemen</h1>
            <p>
              We bring you luxury European cars at direct prices, cutting out
              the extra cost from middlemen and giving you the best deal
              possible.
            </p>
          </div>
          <div className="card" data-aos="zoom-in">
            <h1>Wide Range of Options</h1>
            <p>
              Whether you're looking for a Mercedes, BMW, Porsche, Skoda, or any
              other European Brand we offer a variety of high-end vehicles to
              match your style and needs.
            </p>
          </div>
          <div className="card" data-aos="zoom-in">
            <h1>Fast & Seamless Process</h1>
            <p>
              Forget about long waiting times and complicated processes. We
              provide a smooth and fast import experience, getting your dream
              car to you quicker.
            </p>
          </div>
          <div className="card" data-aos="zoom-in">
            <h1>Transparent Pricing</h1>
            <p>
              No hidden fees, no surprises. We believe in honesty and
              transparency throughout your buying journey.
            </p>
          </div>
          <div className="card" data-aos="zoom-in">
            <h1>Trusted Expertise</h1>
            <p>
              With over 5,000 cars imported to Egypt and the Middle East, we
              have the experience and knowledge to guide you every step of the
              way.
            </p>
          </div>
          <div className="card" data-aos="zoom-in">
            <h1>Customer-Focused Service</h1>
            <p>
              Your satisfaction is our priority. From the moment you choose your
              car until it’s delivered to your door, we ensure you have the best
              experience possible.
            </p>
          </div>
        </div>
      </div>

      <div className="cst-test" data-aos="fade-up">
        <h1>Our customers trust us</h1>
        <div className="carousel">
          <div className="carousel-inner">
            <h1>Carousel Images</h1>
            <h1>Carousel Images</h1>
            <h1>Carousel Images</h1>
            <h1>Carousel Images</h1>
          </div>
        </div>
      </div>

      <div className="faqs" data-aos="fade-up">
        <h1>FAQs</h1>
        {faqs.map((faq, index) => (
          <div
            className="card"
            key={index}
            onClick={() => toggleCard(index)}
            style={{ cursor: "pointer" }}>
            <h1>{faq.question}</h1>
            <p className={`${activeCard === index ? "show" : ""}`}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
