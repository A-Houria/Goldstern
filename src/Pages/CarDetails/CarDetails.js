import Style from "../../styles/CarDetails/CarDetails.module.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos";
import "aos/dist/aos.css";

const CarDetails = () => {
  // New state for form visibility
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openSections, setOpenSections] = useState({
    specialFeatures: false,
    engineSpecs: false,
    exterior: false,
    interior: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    car: "",
    message: "",
  });

  const handlePrevClick = () => {
    setArrowClicked(true);
    setSelectedImageIndex((prev) =>
      prev === 0 ? car.galleryUrls.length - 1 : prev - 1
    );
  };

  const handleNextClick = () => {
    setArrowClicked(true);
    setSelectedImageIndex((prev) =>
      prev === car.galleryUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!formData.phone.startsWith("+20")) {
      setFormData((prev) => ({ ...prev, phone: "+20" }));
    }
  };

  const handleBlur = () => {
    if (formData.phone === "+20") {
      setFormData((prev) => ({ ...prev, phone: "" }));
      setIsFocused(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let input = value;

      // Ensure it starts with "+20"
      if (!input.startsWith("+20")) {
        input = "+20" + input.replace(/^\+?20?/, "");
      }

      // Strip non-digits after +20
      const digits = input.slice(3).replace(/\D/g, "");

      // Limit to 10 digits after +20
      const formatted = "+20" + digits.slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      car: `${car?.Name || ""} ${car?.Model || ""} ${
        car?.Production_Year || ""
      }`,
      message: formData.message,
    };

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          car: "",
          message: "",
        });
        setTimeout(() => {
          setShowInquiryForm(false);
          setStatus("");
        }, 3000);
        setIsFocused(false);
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "Cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const carData = docSnap.data();

          // Generate download URL for main image
          const imageRef = ref(storage, carData.Img);
          const imageUrl = await getDownloadURL(imageRef);

          // Generate download URLs for gallery images
          const imageUrls = await Promise.all(
            carData.Images.map(async (imgPath) => {
              const imgRef = ref(storage, imgPath);
              return getDownloadURL(imgRef);
            })
          );

          const carWithImages = {
            ...carData,
            imageUrl,
            galleryUrls: imageUrls,
          };

          setCar(carWithImages);
        } else {
          setError("Car not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading)
    return (
      <div className={Style.loadingContainer}>
        <img loading="lazy" src="/Icons/Logo-black.webp" alt="" />
      </div>
    );

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <p>Please refresh the page.</p>
      </div>
    );
  return (
    <>
      {car && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": ["Product", "Car"],
              name: `${car.Name} ${car.Model}`,
              image: car.imageUrl,
              description: car.Description,
              sku: id,
              brand: {
                "@type": "Brand",
                name: car.Name,
              },
              offers: {
                "@type": "Offer",
                price: Number(
                  parseFloat(car.Price.replace(/,/g, "")).toFixed(2)
                ),
                priceCurrency: "EGP",
                availability: "https://schema.org/InStock",
                itemCondition:
                  car.Condition === "New"
                    ? "https://schema.org/NewCondition"
                    : "https://schema.org/UsedCondition",
                url: window.location.href,
              },
            }),
          }}
        />
      )}

      <div className={Style.carDetails}>
        <div
          className={Style.floatingMessage}
          style={{ cursor: "pointer" }}
          onClick={() => setShowInquiryForm(!showInquiryForm)}
        >
          <img loading="lazy" src="/Icons/message.webp" alt="Message" />
          <div className={Style.notification}></div>
        </div>
        {showInquiryForm && (
          <div className={Style.inquiryFormContainer} data-aos="fade-down">
            <h1>Interested? Send your car inquiry!</h1>
            <p>
              {car.Name} {car.Model} {car.Production_Year}
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                pattern="^\[1-9][0-9]{8}$"
                title="Phone number must start with +20 and be followed by 10 digits"
                placeholder={isFocused ? "" : "Phone Number"}
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
              {status && <p>{status}</p>}
            </form>
          </div>
        )}
        {car && (
          <div className={Style.card} data-aos="fade-up">
            <img
              loading="lazy"
              className={Style.mainImage}
              src={car.galleryUrls[selectedImageIndex]}
              alt={`Image ${selectedImageIndex + 1}`}
            />

            <div className={Style.carouselContainer}>
              <button
                className={`${Style.arrow} ${Style.left}`}
                onClick={handlePrevClick}
              >
                ‹
              </button>

              <div className={Style.imageIndex}>
                {selectedImageIndex + 1} / {car.galleryUrls.length}
              </div>

              <button
                className={`${Style.arrow} ${Style.right}`}
                onClick={handleNextClick}
              >
                ›
              </button>
            </div>

            <div className={Style.general}>
              <p>Car Brand: {car.Name}</p>
              <p>Car Model: {car.Model}</p>
              <p>Production Year: {car.Production_Year}</p>
              <p>Condition: {car.Condition}</p>
            </div>
          </div>
        )}

        {car.Description && (
          <div className={Style.description} data-aos="fade-up">
            <h1>Description</h1>
            <p>{car.Description}</p>
          </div>
        )}

        <div className={Style.details}>
          {car.Special_Features && (
            <div
              className={Style.specialFeatures}
              data-aos="fade-right"
              onClick={() => toggleSection("specialFeatures")}
              style={{ cursor: "pointer" }}
            >
              <h1>
                Special Features
                <span className={Style.arrowIcon}>
                  {openSections.specialFeatures ? "▲" : "▼"}
                </span>
              </h1>
              <div
                className={`${Style.contentWrapper} ${
                  openSections.specialFeatures ? Style.open : ""
                }`}
              >
                {car.Special_Features.map((feature, index) => (
                  <p key={index}>{feature}</p>
                ))}
              </div>
            </div>
          )}

          {car.Engine_Specs && (
            <div
              className={Style.engineSpecs}
              data-aos="fade-right"
              onClick={() => toggleSection("engineSpecs")}
              style={{ cursor: "pointer" }}
            >
              <h1>
                Engine Specs
                <span className={Style.arrowIcon}>
                  {openSections.engineSpecs ? "▲" : "▼"}
                </span>
              </h1>
              <div
                className={`${Style.contentWrapper} ${
                  openSections.engineSpecs ? Style.open : ""
                }`}
              >
                {car.Engine_Specs.map((spec, index) => (
                  <p key={index}>{spec}</p>
                ))}
              </div>
            </div>
          )}

          {car.Exterior && (
            <div
              className={Style.exterior}
              data-aos="fade-right"
              onClick={() => toggleSection("exterior")}
              style={{ cursor: "pointer" }}
            >
              <h1>
                Exterior
                <span className={Style.arrowIcon}>
                  {openSections.exterior ? "▲" : "▼"}
                </span>
              </h1>
              <div
                className={`${Style.contentWrapper} ${
                  openSections.exterior ? Style.open : ""
                }`}
              >
                {car.Exterior.map((ex, index) => (
                  <p key={index}>{ex}</p>
                ))}
              </div>
            </div>
          )}

          {car.Interior && (
            <div
              className={Style.interior}
              data-aos="fade-right"
              onClick={() => toggleSection("interior")}
              style={{ cursor: "pointer" }}
            >
              <h1>
                Interior
                <span className={Style.arrowIcon}>
                  {openSections.interior ? "▲" : "▼"}
                </span>
              </h1>
              <div
                className={`${Style.contentWrapper} ${
                  openSections.interior ? Style.open : ""
                }`}
              >
                {car.Interior.map((int, index) => (
                  <p key={index}>{int}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarDetails;
