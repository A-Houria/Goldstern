import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
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
          window.location.reload();
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
      <div className="loading-container">
        <img src="/Icons/Logo-black.png" alt="" />
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
    <div className="car-details">
      <div
        className="floating-message"
        style={{ cursor: "pointer" }}
        onClick={() => setShowInquiryForm(!showInquiryForm)}>
        <img src="/Icons/message.png" alt="Message" />
        <div className="notification"></div>
      </div>
      {showInquiryForm && (
        <div className="inquiry-form-container" data-aos="fade-down">
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
        <div className="card" data-aos="fade-up">
          <img src={car.imageUrl} alt={car.Model} />
          <div className="general">
            <p>Car Brand: {car.Name}</p>
            <p>Car Model: {car.Model}</p>
            <p>Production Year: {car.Production_Year}</p>
            <p>Condition: {car.Condition}</p>
          </div>
        </div>
      )}

      {car.Description && (
        <div className="description" data-aos="fade-up">
          <h1>Description</h1>
          <p>{car.Description}</p>
        </div>
      )}

      {car.galleryUrls && car.galleryUrls.length > 0 && (
        <div className="gallery-carousel" data-aos="fade-right">
          <h1>Gallery</h1>

          <div className="main-image">
            <img
              src={car.galleryUrls[selectedImageIndex]}
              alt={`Main ${car.Model}`}
            />
          </div>

          <div className="thumbnails">
            {car.galleryUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={index === selectedImageIndex ? "selected" : ""}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="details">
        {car.Special_Features && (
          <div
            className="special-features"
            data-aos="fade-right"
            onClick={() => toggleSection("specialFeatures")}
            style={{ cursor: "pointer" }}>
            <h1>
              Special Features
              <span className="arrow-icon">
                {openSections.specialFeatures ? "▲" : "▼"}
              </span>
            </h1>
            <div
              className={`content-wrapper ${
                openSections.specialFeatures ? "open" : ""
              }`}>
              {car.Special_Features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
            </div>
          </div>
        )}

        {car.Engine_Specs && (
          <div
            className="engine-specs"
            data-aos="fade-right"
            onClick={() => toggleSection("engineSpecs")}
            style={{ cursor: "pointer" }}>
            <h1>
              Engine Specs
              <span className="arrow-icon">
                {openSections.engineSpecs ? "▲" : "▼"}
              </span>
            </h1>
            <div
              className={`content-wrapper ${
                openSections.engineSpecs ? "open" : ""
              }`}>
              {car.Engine_Specs.map((spec, index) => (
                <p key={index}>{spec}</p>
              ))}
            </div>
          </div>
        )}

        {car.Exterior && (
          <div
            className="exterior"
            data-aos="fade-right"
            onClick={() => toggleSection("exterior")}
            style={{ cursor: "pointer" }}>
            <h1>
              Exterior
              <span className="arrow-icon">
                {openSections.exterior ? "▲" : "▼"}
              </span>
            </h1>
            <div
              className={`content-wrapper ${
                openSections.exterior ? "open" : ""
              }`}>
              {car.Exterior.map((ex, index) => (
                <p key={index}>{ex}</p>
              ))}
            </div>
          </div>
        )}

        {car.Interior && (
          <div
            className="interior"
            data-aos="fade-right"
            onClick={() => toggleSection("interior")}
            style={{ cursor: "pointer" }}>
            <h1>
              Interior
              <span className="arrow-icon">
                {openSections.interior ? "▲" : "▼"}
              </span>
            </h1>
            <div
              className={`content-wrapper ${
                openSections.interior ? "open" : ""
              }`}>
              {car.Interior.map((int, index) => (
                <p key={index}>{int}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
