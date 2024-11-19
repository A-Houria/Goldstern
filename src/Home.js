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
      <div className="hero" data-aos="fade-left">
        <div className="text">
          <div className="services" data-aos="fade-right">
            <h1>Our Services</h1>
            <ul className="services-list">
              <li data-aos="fade-right">
                <img src="./Icons/fast-delivery.png" alt="fast delivery" />
                Fastest Shipping (40 Days)
              </li>
              <li data-aos="fade-right" data-aos-delay="100">
                <img src="./Icons/discount.png" alt="cheapest Shipping" />
                Cheapest Shipping
              </li>
              <li data-aos="fade-right" data-aos-delay="200">
                <img src="./Icons/secure.png" alt="Most Secure shipping" />
                Most Secure shipping
              </li>
              <li data-aos="fade-right" data-aos-delay="300">
                <img
                  src="./Icons/guaranteed.png"
                  alt="Guaranteed Delivery promises"
                />
                Guaranteed Delivery promises
              </li>
            </ul>
          </div>
        </div>
        <img src="./Icons/hero.jpg" alt="background" className="hero-image" />
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
            <li data-aos="fade-up">1. Choosing your car</li>
            <li data-aos="fade-up" data-aos-delay="100">
              2. Configuring your car options
            </li>
            <li data-aos="fade-up" data-aos-delay="200">
              3. Buying the car
            </li>
            <li data-aos="fade-up" data-aos-delay="300">
              4. Shipping it to Egypt
            </li>
            <li data-aos="fade-up" data-aos-delay="400">
              5. Finishing Customs and Paperwork
            </li>
            <li data-aos="fade-up" data-aos-delay="500">
              6. Delivering the car to your doorstep
            </li>
          </ul>
        </div>
        <div className="customs" data-aos="fade-left">
          <h1 data-aos="fade-up">Customs & Paperwork</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            What we handle for you
          </p>
        </div>
        <div className="support" data-aos="fade-right">
          <h1 data-aos="fade-up">After-Sales Support</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Warranty and maintenance information
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
