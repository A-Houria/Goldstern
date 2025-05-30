import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos";
import "aos/dist/aos.css";

const CarDetails = () => {
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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
