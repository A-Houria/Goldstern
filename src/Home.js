import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false }); // 'once' ensures animation happens once
    return () => {
      AOS.refresh(); // Refresh AOS on unmount or content change
    };
  }, []);

  return (
    <div className="home">
      <div className="hero" data-aos="fade-up">
        <h1 className="heading-1">SAVE BIG,</h1>
        <h1 className="heading-2">DRIVE BOLD.</h1>
        <img src="./Icons/hero.png" alt="background" className="hero" />
      </div>
      <div className="text">
        <div className="services" data-aos="fade-right">
          <h1>Our Services</h1>
          <ul className="services-list">
            <li data-aos="fade-right">
              <img src="./Icons/import.png" alt="fast delivery" />
              Importing your Car
            </li>
            <li data-aos="fade-right" data-aos-delay="100">
              <img src="./Icons/expat.png" alt="cheapest Shipping" />
              Importing Cars for Expats
            </li>
            <li data-aos="fade-right" data-aos-delay="200">
              <img src="./Icons/guide.png" alt="Most Secure shipping" />
              Guidance and Consultation
            </li>
            <li data-aos="fade-right" data-aos-delay="300">
              <img
                src="./Icons/support.png"
                alt="Guaranteed Delivery promises"
              />
              After-Sales Support
            </li>
          </ul>
        </div>
      </div>

      <div className="featured" data-aos="fade-left">
        <h1 className="header">Our Featured Cars</h1>
        <div className="cards">
          <div className="card" data-aos="fade-up">
            <img src=".\Icons\Taycan.png" alt="Taycan Front View" />
            <div className="text">
              <h1>Porsche Taycan</h1>
              <div className="parts">
                <p>
                  <img src=".\Icons\piston.png" alt="Power" />
                  450 HP
                </p>
                <p>
                  <img src=".\Icons\speed.png" alt="speed" />
                  450 KM/H
                </p>
                <p>
                  <img src=".\Icons\price.png" alt="price" />
                  35,000€
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <img
              src=".\Icons\porsche-boxster-gts.png"
              alt="Porsche Boxster GTS"
            />
            <div className="text">
              <h1>Porsche Boxster GTS</h1>
              <div className="parts">
                <p>
                  <img src=".\Icons\piston.png" alt="Power" />
                  450 HP
                </p>
                <p>
                  <img src=".\Icons\speed.png" alt="speed" />
                  450 KM/H
                </p>
                <p>
                  <img src=".\Icons\price.png" alt="price" />
                  35,000€
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <img src=".\Icons\bmw-z4.png" alt="Taycan Front View" />
            <div className="text">
              <h1>BMW Z4</h1>
              <div className="parts">
                <p>
                  <img src=".\Icons\piston.png" alt="Power" />
                  450 HP
                </p>
                <p>
                  <img src=".\Icons\speed.png" alt="speed" />
                  450 KM/H
                </p>
                <p>
                  <img src=".\Icons\price.png" alt="price" />
                  35,000€
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="300">
            <img src=".\Icons\Taycan.png" alt="Taycan Front View" />
            <div className="text">
              <h1>Porsche Taycan</h1>
              <div className="parts">
                <p>
                  <img src=".\Icons\piston.png" alt="Power" />
                  450 HP
                </p>
                <p>
                  <img src=".\Icons\speed.png" alt="speed" />
                  450 KM/H
                </p>
                <p>
                  <img src=".\Icons\price.png" alt="price" />
                  35,000€
                </p>
              </div>
            </div>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="400">
            <img src=".\Icons\porsche-boxster-gts.png" alt="Boxster GTS" />
            <div className="text">
              <h1>Porsche Boxster GTS</h1>
              <div className="parts">
                <p>
                  <img src=".\Icons\piston.png" alt="Power" />
                  450 HP
                </p>
                <p>
                  <img src=".\Icons\speed.png" alt="speed" />
                  450 KM/H
                </p>
                <p>
                  <img src=".\Icons\price.png" alt="price" />
                  35,000€
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details" data-aos="fade-up">
        <h1>How it works</h1>
        <div className="process" data-aos="fade-right">
          <h1>Step By Step Process</h1>
          <ul className="process-list">
            <li>
              <h1>1. Contact Our Team</h1>
              <p>
                Reach out to us via phone, email, or our website. Our friendly
                team will assist you in choosing the perfect car based on your
                preferences, budget, and needs.
              </p>
            </li>
            <li>
              <h1>2. Consultation & Car Selection</h1>
              <p>
                Once we understand your requirements, we’ll provide you with a
                range of options from European car inventory. You can ask any
                questions and get expert advice to help you make the right
                choice.
              </p>
            </li>
            <li>
              <h1>3. Quotation & Agreement</h1>
              <p>
                After selecting your car, we’ll give you a clear and transparent
                quote with factory-direct pricing, including all costs
                involved—no hidden fees. Once you’re happy, we move forward with
                the agreement.
              </p>
            </li>
            <li>
              <h1>4. Car Ordering & Shipping</h1>
              <p>
                After finalizing your order, we will process the import and
                handle all the logistics, including shipping and documentation.
              </p>
            </li>
            <li>
              <h1>5. Customs Clearance & Delivery</h1>
              <p>
                Your car will be cleared through customs quickly and
                efficiently. Once everything is in order, we’ll schedule a
                convenient delivery date right to your doorstep.
              </p>
            </li>
            <li>
              <h1>6. Car Inspection & Handover</h1>
              <p>
                Upon delivery, we’ll conduct a thorough inspection to ensure the
                car meets your expectations. You’ll receive all the necessary
                documentation, and we’ll explain all the car features before
                handing over the keys.
              </p>
            </li>
            <li>
              <h1>7. After-Sales Service</h1>
              <p>
                Our relationship doesn’t end at delivery. We provide
                post-purchase support and offer ongoing services through our
                partners like maintenance, repairs, and assistance, ensuring
                your car stays in top condition.
              </p>
            </li>
            <h1>
              "From start to finish, we make the importing process easy,
              efficient, and transparent, so you can enjoy your dream car
              without the hassle."
            </h1>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
