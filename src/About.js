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
          It all started with a passion, When Abderhaman Horia, a brilliant car
          engineer who set out to make a difference. While studying automotive
          engineering in Germany. Abderhaman noticed a Huge gap between the car
          industry in Egypt and Europe. The result? Overpriced vehicles and a
          limited selection for Egyptian car enthusiasts.
        </p>
        <p>
          But he couldn’t do it alone. Mr. Mostafa Shafie, his trusted partner
          and co-founder, joined him on this ambitious journey. Together, they
          launched Goldstern in 2019, with a clear mission: to close the gap and
          offer Egyptian consumers access to the finest European cars at
          reasonable prices. In the early years, Goldstern focused on B2B deals,
          importing unique and luxury cars to Egypt, and helping businesses and
          dealers get access to these high-demand vehicles.
        </p>
        <p>
          By the end of 2023, after exporting over 5,000 cars to Egypt and the
          Arabian world—Jordan, Dubai, and Saudi Arabia—Abderhaman and Mostafa
          saw another crucial gap: the Over prices customers were paying at
          local car dealerships and importers. The system was broken, and they
          knew they had to fix it.
        </p>
        <p>
          So they decided to offer seamless car imports, no middlemen
          experience, a wide range of options, and transparent pricing.
        </p>
      </div>

      <div className="mission" data-aos="fade-up">
        <div className="cards">
          <div className="card" data-aos="fade-right">
            <h1>Our Mission</h1>
            <p>
              revolutionize the car-buying experience in Egypt by providing
              luxury European cars directly to customers at factory prices. We
              are committed to delivering a seamless, transparent, and
              affordable car import service, ensuring that every car enthusiast
              can access their dream vehicle with ease, efficiency, and
              unmatched value.
            </p>
          </div>
          <div className="card" data-aos="fade-left">
            <h1>Our Values</h1>
            <p>Transparency, Trust, Satisfaction, and Quality</p>
          </div>
        </div>
      </div>

      <div className="message" data-aos="fade-up">
        <h1>Founders' Message</h1>
        <p>
          At Goldstern, we’re not just bringing luxury cars to Egypt—we’re
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
