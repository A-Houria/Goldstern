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

          const carWithImages = { ...carData, imageUrl, galleryUrls: imageUrls };
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

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

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

      {car.Images && (
          <div className="gallary" data-aos="fade-right">
          <h1>Gallery</h1>
          <div className="images">
          {car.galleryUrls.map((img, index) => (
            <img key={index} src={img} alt={`${car.Model} ${index + 1}`} />
          ))}
          </div>
        </div>
        )}

      <div className="details">
        
        {car.Special_Features && (
          <div className="special-features" data-aos="fade-right">
          <h1>Special Features</h1>
          {car.Special_Features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
        )}

        {car.Engine_Specs && (
          <div className="engine-specs" data-aos="fade-right">
          <h1>Engine Specs</h1>
          {car.Engine_Specs.map((spec, index) => (
            <p key={index}>{spec}</p>
          ))}
        </div>
        )}

        {car.Exterior && (
          <div className="exterior" data-aos="fade-right">
          <h1>Exterior</h1>
          {car.Exterior.map((ex, index) => (
            <p key={index}>{ex}</p>
          ))}
        </div>
        )}

        {car.Interior && (
          <div className="interior" data-aos="fade-right">
          <h1>Interior</h1>
          {car.Interior.map((int, index) => (
            <p key={index}>{int}</p>
          ))}
        </div>
        )}
      </div>

      {car.Description && (
        <div className="description" data-aos="fade-up">
          <h1>Description</h1>
          <p>{car.Description}</p>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
