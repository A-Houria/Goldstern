import Style from "../../styles/Home/Home.module.css";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import AOS from "aos";
import { Helmet } from "react-helmet";
import "aos/dist/aos.css";

const HERO_URL =
  "https://firebasestorage.googleapis.com/v0/b/goldstone-db.appspot.com/o/Hero%2Fhero.webp?alt=media";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [animate, setAnimate] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState(HERO_URL); // render immediately
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerClick = () => setIsOpen((prev) => !prev);

  // Fetch reviews asynchronously
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

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setAnimate(true);
      setSlideDirection("right");
      setTimeout(() => {
        setCurrentReviewIndex((prev) =>
          prev === reviews.length - 1 ? 0 : prev + 1
        );
        setAnimate(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  // Fetch featured cars asynchronously
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
            .filter((car) => car.Featured === true)
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
        console.error("Error fetching cars:", err);
      }
    };

    fetchFeaturedCars();
  }, []);

  // Render hero immediately; show skeletons while loading other content
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
              "Goldstern, founded in 2019 by automotive engineer Abderhaman Horia...",
            telephone: "+20-10-00445786",
            email: "info@goldsternonline.de",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Makan Mall, Waslet Dahshur Rd",
              addressLocality: "Second Al Sheikh Zayed",
              addressRegion: "Giza Governorate",
              addressCountry: "EG",
            },
          })}
        </script>
      </Helmet>

      <div className={Style.home}>
        {/* Hero Section */}
        <div className={Style.hero} data-aos="fade-up">
          <img
            loading="lazy"
            src={heroImageUrl}
            alt="hero"
            className={Style.hero}
          />
        </div>

        {/* Services Section */}
        {/* ...same as before... */}

        {/* Featured Cars */}
        <div className={Style.featured} data-aos="fade-left">
          <h1 className={Style.header}>Our Featured Cars</h1>
          <div className={Style.cards}>
            {featuredCars.length > 0
              ? featuredCars
                  .filter((car) => car.Featured && car.imageUrl && !car.Hidden)
                  .map((car) => (
                    <Link to={`/car/${car.id}`} key={car.id}>
                      <div className={Style.card} data-aos="fade-up">
                        <img
                          loading="lazy"
                          src={car.imageUrl}
                          alt={car.Model}
                        />
                        <div className={Style.text}>
                          <div className={Style.parts}>
                            <p>
                              {car.Name} {car.Model} {car.Production_Year}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`${Style.card} ${Style.skeleton}`} />
                ))}
          </div>
        </div>

        {/* Reviews */}
        <div className={Style.reviews} data-aos="fade-up">
          <h1 className={Style.title}>Our clients trust us</h1>
          <p className={Style.subTitle}>
            Here's what some of our satisfied clients had to say about us
          </p>
          {reviews.length > 0 ? (
            <div
              className={`${Style.card} ${
                animate ? Style[`slide-${slideDirection}`] : ""
              }`}
              key={currentReviewIndex}
            >
              <p className={Style.message}>
                {reviews[currentReviewIndex].Message || "No message provided."}
              </p>
              <div className={Style.stars}>
                {Array.from(
                  { length: reviews[currentReviewIndex].Rating || 0 },
                  (_, i) => (
                    <img key={i} src="./Icons/star.webp" alt="review star" />
                  )
                )}
              </div>
              <p className={Style.name}>
                - {reviews[currentReviewIndex].Name} -
              </p>
              <small>
                <img src="./Icons/google.webp" alt="google" />
                Google Review
              </small>
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
