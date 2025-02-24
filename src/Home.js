import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase"; // Adjust this import path based on your project structure
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const fetchFeaturedCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cars"));
        const carItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const featuredCarsWithImages = await Promise.all(
          carItems
            .filter((car) => car.Featured === true) // Filter only featured cars
            .map(async (car) => {
              try {
                const imageRef = ref(storage, car.Img);
                const imageUrl = await getDownloadURL(imageRef);
                return { ...car, imageUrl };
              } catch (err) {
                console.error("Error fetching car image URL:", err);
                return { ...car, imageUrl: "" };
              }
            })
        );

        setFeaturedCars(featuredCarsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  if (loading)
    return (
      <div className="loading-container">
        <img src=".\Icons\Logo-black.png" alt=""/>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <p>Please refresh the page.</p>
      </div>
    );

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero" data-aos="fade-up">
        <h1 className="heading-1">SAVE BIG,</h1>
        <h1 className="heading-2">DRIVE BOLD.</h1>
        <img src="./Icons/hero.png" alt="background" className="hero" />
      </div>

      {/* Services Section */}
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
              <img src="./Icons/support.png" alt="Guaranteed Delivery promises" />
              After-Sales Support
            </li>
          </ul>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="featured" data-aos="fade-left">
        <h1 className="header">Our Featured Cars</h1>
        <div className="cards">
          {featuredCars
            .filter((car) => car.Featured === true) 
            .map((car) => (
              <Link to={`/car/${car.id}`} key={car.id}> 
                <div className="card" data-aos="fade-up">
                  <img src={car.imageUrl} alt={car.Model} />
                  <div className="text">
                    <div className="parts">
                      <p>{car.Name} {car.Model} {car.Production_Year}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="details" data-aos="fade-up">
        <h1>How it works</h1>
        <div className="process" data-aos="fade-right">
          <h1>Step By Step Process</h1>
          <ul className="process-list">
            <li>
              <h1>1. Contact Our Team</h1>
              <p>
                Reach out to us via phone, email, or our website. Our friendly team will assist you in choosing the perfect car based on your preferences, budget, and needs.
              </p>
            </li>
            <li>
              <h1>2. Consultation & Car Selection</h1>
              <p>
                Once we understand your requirements, we’ll provide you with a range of options from European car inventory. You can ask any questions and get expert advice to help you make the right choice.
              </p>
            </li>
            <li>
              <h1>3. Quotation & Agreement</h1>
              <p>
                After selecting your car, we’ll give you a clear and transparent quote with factory-direct pricing, including all costs involved—no hidden fees. Once you’re happy, we move forward with the agreement.
              </p>
            </li>
            <li>
              <h1>4. Car Ordering & Shipping</h1>
              <p>
                After finalizing your order, we will process the import and handle all the logistics, including shipping and documentation.
              </p>
            </li>
            <li>
              <h1>5. Customs Clearance & Delivery</h1>
              <p>
                Your car will be cleared through customs quickly and efficiently. Once everything is in order, we’ll schedule a convenient delivery date right to your doorstep.
              </p>
            </li>
            <li>
              <h1>6. Car Inspection & Handover</h1>
              <p>
                Upon delivery, we’ll conduct a thorough inspection to ensure the car meets your expectations. You’ll receive all the necessary documentation, and we’ll explain all the car features before handing over the keys.
              </p>
            </li>
            <li>
              <h1>7. After-Sales Service</h1>
              <p>
                Our relationship doesn’t end at delivery. We provide post-purchase support and offer ongoing services through our partners like maintenance, repairs, and assistance, ensuring your car stays in top condition.
              </p>
            </li>
            <h1>
              "From start to finish, we make the importing process easy, efficient, and transparent, so you can enjoy your dream car without the hassle."
            </h1>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
