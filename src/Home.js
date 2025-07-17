import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase"; // Adjust this import path based on your project structure
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos";
import { Helmet } from "react-helmet";
import "aos/dist/aos.css";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [animate, setAnimate] = useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  // Fetch reviews from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Goldstern-reviews"));
        const data = snapshot.docs.map((doc) => doc.data());
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setAnimate(true); // trigger animation
      setSlideDirection("right");

      setTimeout(() => {
        setCurrentReviewIndex((prev) =>
          prev === reviews.length - 1 ? 0 : prev + 1
        );
        setAnimate(false); // reset animation after update
      }, 400); // duration should match the CSS transition time
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

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
        <img loading="lazy" src="/Icons/Logo-black.webp" alt="" />
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
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarDealer",
            name: "Goldstern",
            url: "https://goldsternonline.de",
            logo: "https://goldsternonline.de/Icons/Logo.webp",
            image: "https://goldsternonline.de/Icons/Logo.webp",
            description:
              "Goldstern, founded in 2019 by automotive engineer Abderhaman Horia, offers premium European cars to Egypt and the Arabian region with transparent pricing and a seamless import process.",
            telephone: "+20-10-00445786",
            email: "info@goldsternonline.de",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Makan Mall, Waslet Dahshur Rd",
              addressLocality: "Second Al Sheikh Zayed",
              addressRegion: "Giza Governorate",
              addressCountry: "EG",
            },
            openingHours: "Mo-Su 10:00-22:00",
            areaServed: [{ "@type": "Country", name: "Egypt" }],
            founder: {
              "@type": "Person",
              name: "Abderhaman Horia",
            },
            foundingDate: "2019",
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "On-Ground Cars - Ready for Immediate Delivery",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Import Your Dream Car",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Expert Guidance & Consultation",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "After-Sales Support",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="home">
        {/* Hero Section */}
        <div className="hero" data-aos="fade-up">
          {
            //<h1 className="heading-1">SAVE BIG,</h1>
            //<h1 className="heading-2">DRIVE BOLD.</h1>
          }
          <img
            loading="lazy"
            src="./Icons/hero.webp"
            alt="background"
            className="hero"
          />
        </div>

        {/* Services Section */}
        <div className="text">
          <div className="services" data-aos="fade-right">
            <h1>Our Services</h1>
            <ul className="services-list">
              <li data-aos="fade-right">
                <img
                  loading="lazy"
                  src="./Icons/speed.webp"
                  alt="immediate delivery"
                />
                In-Stock Cars - Ready for Immediate Delivery
              </li>
              <li data-aos="fade-right" data-aos-delay="100">
                <img loading="lazy" src="./Icons/ship.webp" alt="Import" />
                Import Your Dream Car
              </li>
              <li data-aos="fade-right" data-aos-delay="200">
                <img
                  loading="lazy"
                  src="./Icons/guide.webp"
                  alt="Most Secure shipping"
                />
                Expert Guidance & Consultation
              </li>
              <li data-aos="fade-right" data-aos-delay="300">
                <img
                  loading="lazy"
                  src="./Icons/support.webp"
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
            {featuredCars
              .filter((car) => car.Featured === true && car.imageUrl)
              .map((car) => (
                <Link to={`/car/${car.id}`} key={car.id}>
                  <div className="card" data-aos="fade-up">
                    <img loading="lazy" src={car.imageUrl} alt={car.Model} />
                    <div className="text">
                      <div className="parts">
                        <p>
                          {car.Name} {car.Model} {car.Production_Year}
                        </p>
                        {/*<p>
                          <div className="green"></div> Available Immediately
                        </p>*/}
                        <p>{car.Price}</p>
                      </div>
                      <NavLink onClick={handleBurgerClick} to="/inventory">
                        <button className="inventory">View Inventory</button>
                      </NavLink>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="details" data-aos="fade-up">
          <h1 className="how">How it works</h1>
          <div className="process" data-aos="fade-right">
            <h1 className="process-title">Step By Step Process</h1>
            <ul className="process-list">
              <li>
                <h1>
                  <span>1</span> Contact Our Team
                </h1>
                <p>
                  Get in touch with us by phone, email, or through our website.
                  Our dedicated team is here to help you find the perfect car
                  tailored to your preferences, budget, and lifestyle.
                </p>
              </li>
              <li>
                <h1>
                  <span>2</span> Consultation & Car Selection
                </h1>
                <p>
                  Once we understand your needs, our team will present you with
                  a curated selection from our European car inventory. Feel free
                  to ask any questions our experts are here to guide you with
                  personalized advice and help you make the perfect choice.
                </p>
              </li>
              <li>
                <h1>
                  <span>3</span> Quotation & Agreement
                </h1>
                <p>
                  Once you’ve selected your car, we’ll provide a transparent
                  quotation with factory direct pricing clearly outlining all
                  costs with no hidden fees. When you’re fully satisfied, we
                  proceed with the agreement and next steps.
                </p>
              </li>
              <li>
                <h1>
                  <span>4</span> Car Ordering & Shipping
                </h1>
                <p>
                  Once your order is confirmed, we take care of the entire
                  import process including international shipping, customs
                  clearance, and all required documentation ensuring a smooth
                  and hassle free experience
                </p>
              </li>
              {/*<li>
                <h1>
                  <span>5</span> Customs Clearance & Delivery
                </h1>
                <p>
                  Your car will be cleared through customs quickly and
                  efficiently. Once everything is in order, we’ll schedule a
                  convenient delivery date right to your doorstep.
                </p>
              </li> */}
              <li>
                <h1>
                  <span>5</span> Car Inspection & Handover
                </h1>
                <p>
                  and our team will walk you through the car’s features before
                  handing over the keys
                </p>
              </li>
              <li>
                <h1>
                  <span>6</span> After-Sales Service
                </h1>
                <p>
                  Our relationship doesn’t end at delivery. We offer
                  comprehensive post-purchase support through our trusted
                  partners including maintenance, repairs, and assistance to
                  keep your vehicle in excellent condition for years to come.
                </p>
              </li>
              <h1 className="quote">
                "From the first step to the final handover, we make importing
                your dream car easy, seamless, and completely transparent — so
                you can drive with confidence and peace of mind."
              </h1>
            </ul>
          </div>
        </div>
        <div className="reviews" data-aos="fade-up">
          <h1 className="title">Our clients trust us</h1>
          <p className="sub-title">
            Here's what some of our satisfied clients had to say about us
          </p>
          {reviews.length > 0 ? (
            <div
              className={`card ${animate ? `slide-${slideDirection}` : ""}`}
              key={currentReviewIndex}
            >
              <p className="message">
                {reviews[currentReviewIndex].Message || "No message provided."}
              </p>
              <div className="stars">
                {Array.from(
                  { length: reviews[currentReviewIndex].Rating || 0 },
                  (_, i) => (
                    <img key={i} src="./Icons/star.webp" alt="review star" />
                  )
                )}
              </div>
              <p className="name">- {reviews[currentReviewIndex].Name} -</p>
            </div>
          ) : (
            <p>Loading reviews...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
