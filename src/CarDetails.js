import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "./firebase"; 
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const CarDetails = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false }); // Initialize AOS

    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "Cars", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const carData = docSnap.data();
          const imageRef = ref(storage, carData.Img);
          const imageUrl = await getDownloadURL(imageRef);

          const carWithImage = { ...carData, imageUrl };
          setCar(carWithImage);

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
        <div className="card" data-aos="fade-up"> {/* Add AOS animation */}
          <img src={car.imageUrl} alt={car.Model} />
          <div className="general">
            <p>Car Brand: {car.Name}</p>
            <p>Car Model: {car.Model}</p>
            <p>Production Year: {car.Prod_Year}</p>
            <p>Condition: {car.Condition}</p>
          </div>
        </div>
      )}
     
      <div className="details">
        <div className="special-features" data-aos="fade-right"> {/* Add AOS animation */}
          <h1>Special Features</h1>
          {car.Special_Features.map((feature) => (
            <p key={feature.index}>{feature}</p>
          ))}
        </div>
        <div className="engine-specs" data-aos="fade-right"> {/* Add AOS animation */}
          <h1>Engine Specs</h1>
          {car.Engine_Specs.map((spec) => (
            <p key={spec.index}>{spec}</p>
          ))}
        </div>
        <div className="exterior" data-aos="fade-right"> {/* Add AOS animation */}
          <h1>Exterior</h1>
          {car.Exterior.map((ex) => (
            <p key={ex.index}>{ex}</p>
          ))}
        </div>
        <div className="interior" data-aos="fade-right"> {/* Add AOS animation */}
          <h1>Interior</h1>
          {car.Interior.map((int) => (
            <p key={int.index}>{int}</p>
          ))}
        </div>
      </div>
      {car.Description && (
        <div className="description" data-aos="fade-up"> {/* Add AOS animation */}
          <h1>Description</h1>
          <p>{car.Description}</p>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
