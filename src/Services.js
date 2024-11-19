import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
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
        <h1>Car Importing</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          expedita saepe reprehenderit molestias doloremque incidunt
          perspiciatis optio labore eum inventore eligendi adipisci, nulla
          provident? Reprehenderit libero, nostrum earum amet provident eveniet
          aspernatur accusantium omnis possimus facere doloribus dicta veritatis
          rerum doloremque vitae repellendus ad adipisci suscipit optio
          corporis. Corporis, et?
        </p>
      </div>
      <div className="service" data-aos="fade-up">
        <h1>Shipping</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
          necessitatibus sed inventore nam. In aliquid sint, sed officia
          voluptatem facilis quibusdam autem unde, architecto, consectetur
          fugiat suscipit deserunt earum totam.
        </p>
      </div>
      <div className="service" data-aos="fade-up">
        <h1>Customs</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          rem enim architecto officia rerum labore, molestiae corrupti ratione
          inventore hic quae vero ea, molestias laboriosam voluptatibus!
          Nesciunt est vel vitae sit reiciendis natus eligendi saepe? Sed
          obcaecati aliquid at iure?
        </p>
      </div>
      <div className="contact-us" data-aos="fade-up">
        <form>
          <h1>Contact Us</h1>
          <p>We will get in touch shortly</p>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input required type="email" name="email" id="email" />
          </div>
          <div className="input">
            <label htmlFor="message">Your Inquiry</label>
            <textarea required type="message" name="message" id="message" />
          </div>
          <button onClick={handlesubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="import" data-aos="fade-up">
        <h1>Why Import with Us</h1>
        <div className="cards">
          <div className="card" data-aos="fade-right">
            <h1>Cost Savings</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sint
              dolores, vel omnis totam at blanditiis molestiae a. Dignissimos,
              nemo.
            </p>
          </div>
          <div className="card" data-aos="fade-left">
            <h1>Fast Delivery</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sint
              dolores, vel omnis totam at blanditiis molestiae a. Dignissimos,
              nemo.
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
