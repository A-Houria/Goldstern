import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

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

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Goldstern",
        url: "https://goldsternonline.de",
        logo: "https://goldsternonline.de/logo.png", // update if you have logo
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+20-10-00445786",
          contactType: "customer service",
          areaServed: "EG",
          availableLanguage: ["English", "German", "Arabic"],
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61552608263446",
          "https://www.instagram.com/goldstern_eg",
          "https://www.tiktok.com/@goldstern.eg",
          "https://www.linkedin.com/company/103967635",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Goldstern Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "In-Stock Cars - Ready for Immediate Delivery",
                description:
                  "Luxury European cars ready for immediate delivery.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Import Your Dream Car",
                description:
                  "We assist with importing your dream car from Europe.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Expert Guidance & Consultation",
                description:
                  "Professional guidance and consultation during the import process.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "After-Sales Support",
                description:
                  "Comprehensive after-sales support for all imported vehicles.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="services">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <div className="service" data-aos="fade-up">
        <h1 className="title">Our Services</h1>
        <div className="services">
          <h1>
            <img src="./Icons/speed.png" alt="immediate delivery" />
            In-Stock Cars - Ready for Immediate Delivery
          </h1>
          <h1>
            <img src="./Icons/ship.png" alt="Import" />
            Import Your Dream Car
          </h1>
          <h1>
            {" "}
            <img src="./Icons/guide.png" alt="Most Secure shipping" />
            Expert Guidance & Consultation
          </h1>
          <h1>
            <img src="./Icons/support.png" alt="Guaranteed Delivery promises" />
            After-Sales Support
          </h1>
        </div>
      </div>
      <div className="import" data-aos="fade-up">
        <h1>Why Import with Us</h1>
        <div className="cards">
          <div className="card" data-aos="zoom-in">
            <img
              src="./Icons/Piggy_Bank.jpg"
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
            <img src="./Icons/Options.jpg" alt="Wide Range of Options" />
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
            <img src="./Icons/Fast_Ship.jpg" alt="Fast & Seamless Process" />
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
              src="./Icons/Transparent_Pricing.jpg"
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
            <img src="./Icons/Trust.jpg" alt="Trusted Expertise" />
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
            <img src="./Icons/Rating.jpg" alt="Customer-Focused Service" />
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

export default Services;
