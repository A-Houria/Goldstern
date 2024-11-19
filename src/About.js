import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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
    <div className="about">
      <div className="story" data-aos="fade-up">
        <h1>Our Story</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
          ullam dignissimos expedita distinctio perferendis rerum, totam, dolore
          eos ab mollitia deserunt sint perspiciatis molestias? Recusandae,
          commodi cumque impedit possimus eius eveniet voluptas assumenda.
          Molestiae omnis voluptatibus debitis animi quasi maxime! Quo mollitia
          est sit, quaerat tempore corporis molestiae distinctio ab?
        </p>
      </div>

      <div className="mission" data-aos="fade-up">
        <div className="cards">
          <div className="card" data-aos="fade-right">
            <h1>Our Mission</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              placeat eveniet vel pariatur at eligendi qui aperiam adipisci, aut
              nesciunt.
            </p>
          </div>
          <div className="card" data-aos="fade-left">
            <h1>Our Values</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque,
              vero! Suscipit nesciunt veritatis eaque, eius vero vitae
              consequuntur ipsa non.
            </p>
          </div>
        </div>
      </div>

      <div className="message" data-aos="fade-up">
        <h1>Founders' Message</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut hic
          nostrum eius temporibus numquam, vero sequi magnam deleniti facere
          consequuntur error tempore vitae cupiditate itaque nemo maxime. Magni
          iure voluptas aliquid deleniti quod dolorum blanditiis minus et in
          tempora nemo natus possimus pariatur doloremque quasi odio aliquam
          temporibus ab fugiat, delectus accusamus! Corrupti aspernatur a atque
          blanditiis cum fugit odio rem voluptas. Pariatur harum excepturi,
          quisquam ut dolor vero quos inventore sapiente minima porro nesciunt
          eligendi veniam temporibus autem enim totam quidem sit a distinctio
          quo alias? Quo, earum! Officiis quasi commodi deleniti similique
          quisquam nam placeat repellat iste vel.
        </p>
      </div>

      <div className="import" data-aos="fade-up">
        <h1>Why Import with Us</h1>
        <div className="cards">
          <div className="card" data-aos="zoom-in">
            <h1>Cost Savings</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sint
              dolores, vel omnis totam at blanditiis molestiae a. Dignissimos,
              nemo.
            </p>
          </div>
          <div className="card" data-aos="zoom-in" data-aos-delay="100">
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

export default About;
