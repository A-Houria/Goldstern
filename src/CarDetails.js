import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase"; 
import { ref, getDownloadURL } from "firebase/storage";

const CarDetails = () => {
  const { id } = useParams(); // Get car id from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCollections, setSubCollections] = useState({});

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "Cars", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const carData = docSnap.data();
          const imageRef = ref(storage, carData.Img);
          const imageUrl = await getDownloadURL(imageRef);

          // Store the car data with imageUrl
          const carWithImage = { ...carData, imageUrl };
          setCar(carWithImage);

          // Now check if there are any sub-collections and fetch them
          await fetchSubCollections(docRef);
        } else {
          setError("Car not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the sub-collections
    const fetchSubCollections = async (docRef) => {
      const subCollectionNames = ['Engine']; // List of known sub-collection names
      const subCollectionsData = {};

      // Loop through known sub-collections and fetch their documents
      for (let subCol of subCollectionNames) {
        const subCollectionRef = collection(docRef, subCol);
        const subColSnap = await getDocs(subCollectionRef);

        // Map the documents in the sub-collection
        const subDocs = subColSnap.docs.map((doc) => doc.data());
        subCollectionsData[subCol] = subDocs;
      }

      // Store the sub-collections data
      setSubCollections(subCollectionsData);
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="car-details">
      {car && (
        <div className="card">
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
        
      </div>
    </div>
  );
};

export default CarDetails;
