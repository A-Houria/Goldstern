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
        <h1>
          <img loading="lazy" src="./Icons/story.webp" alt="Our Story" />
          Our Story
        </h1>
        <p>
          While studying software engineering in Germany, Abderhaman Houria
          noticed a problem: back in Egypt, people were paying too much for cars
          with too few choices. In Europe, great cars were affordable and
          readily available.
        </p>
        <p>So in 2019, he founded Goldstern to bring those same cars home.</p>
        <p>
          At first, the mission was to help dealers and businesses import
          premium vehicles. But it quickly became clear that everyday people
          were stuck paying inflated prices through layers of middlemen.
        </p>
        <p>So we shifted focus.</p>
        <p>
          Today, Goldstern works directly with customers making car imports
          simple, transparent, and fair. You can choose from ready-to-ship
          models or order a car built exactly the way you want it.
        </p>
        <p>
          Because buying a car should feel exciting, not frustrating. And above
          all you deserve better
        </p>
      </div>

      <div className="mission" data-aos="fade-up">
        <div className="cards">
          <div className="card" data-aos="fade-right">
            <h1>
              <img
                loading="lazy"
                src="./Icons/mission.webp"
                alt="Our Mission"
              />
              Our Mission
            </h1>
            <p>
              Revolutionizing the car-buying experience in Egypt by providing
              luxury European cars directly to customers at factory prices. We
              are committed to delivering a seamless, transparent, and
              affordable car import service, ensuring that every car enthusiast
              can access their dream vehicle with ease, efficiency, and
              unmatched value.
            </p>
          </div>
          <div className="card" data-aos="fade-left">
            <h1>
              <img loading="lazy" src="./Icons/values.webp" alt="Our Values" />
              Our Values
            </h1>
            <p>
              <strong>Transparency</strong> We believe in open, honest
              communication ensuring clarity and accountability in every step of
              the process
            </p>
            <p>
              <strong>Trust</strong> We earn and maintain trust through
              consistency, integrity, and reliability with customers, partners,
              and our team.
            </p>
            <p>
              <strong>Satisfaction</strong> Your experience comes first. We’re
              committed to exceeding expectations and delivering service that
              truly meets your needs.
            </p>
            <p>
              <strong>Quality</strong> Excellence is our standard. From vehicle
              selection to final delivery, we take pride in offering premium
              products and detail-driven service.
            </p>
          </div>
        </div>
      </div>

      <div className="message" data-aos="fade-up">
        <h1>
          <img
            loading="lazy"
            src="./Icons/founder-message.webp"
            alt="Founders' Message"
          />
          Founders' Message
        </h1>
        <p>
          At Goldstern, we’re not just bringing luxury cars to Egypt, we’re
          delivering dreams. With a passion for excellence and a commitment to
          transparency, we’re here to redefine the car-buying experience. From
          our family to yours, thank you for trusting us to bring your dream
          ride to life.
        </p>
      </div>

      <div className="import" data-aos="fade-up">
        <h1>Why Import with Us</h1>
        <div className="cards">
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Piggy_Bank.webp"
              alt="Cheapest Prices, No Middlemen"
            />
            <div className="text">
              <h1>Cheapest Prices, No Middlemen</h1>
              <p>
                We bring you luxury European cars at direct prices, cutting out
                the extra cost from middlemen and giving you the best deal
                possible.
              </p>
            </div>
          </div>
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Options.webp"
              alt="Wide Range of Options"
            />
            <div className="text">
              <h1>Wide Range of Options</h1>
              <p>
                Whether you're looking for a Mercedes, BMW, Porsche, Skoda, or
                any other European Brand we offer a variety of high-end vehicles
                to match your style and needs.
              </p>
            </div>
          </div>
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Fast_Ship.webp"
              alt="Fast & Seamless Process"
            />
            <div className="text">
              <h1>Fast & Seamless Process</h1>
              <p>
                Forget about long waiting times and complicated processes. We
                provide a smooth and fast import experience, getting your dream
                car to you quicker.
              </p>
            </div>
          </div>
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Transparent_Pricing.webp"
              alt="Transparent Pricing"
            />
            <div className="text">
              <h1>Transparent Pricing</h1>
              <p>
                No hidden fees, no surprises. We believe in honesty and
                transparency throughout your buying journey.
              </p>
            </div>
          </div>
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Trust.webp"
              alt="Trusted Expertise"
            />
            <div className="text">
              <h1>Trusted Expertise</h1>
              <p>
                With over 5,000 cars imported to Egypt and the Middle East, we
                have the experience and knowledge to guide you every step of the
                way.
              </p>
            </div>
          </div>
          <div className="card" data-aos="zoom-in">
            <img
              loading="lazy"
              src="./Icons/Rating.webp"
              alt="Customer-Focused Service"
            />
            <div className="text">
              <h1>Customer-Focused Service</h1>
              <p>
                Your satisfaction is our priority. From the moment you choose
                your car until it’s delivered to your door, we ensure you have
                the best experience possible.
              </p>
            </div>
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
            style={{ cursor: "pointer" }}
          >
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
