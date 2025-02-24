import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase"; 
import { ref, getDownloadURL } from "firebase/storage";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom"; 

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(""); 

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cars"));
        const carItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const carsWithImages = await Promise.all(
          carItems.map(async (car) => {
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

        setCars(carsWithImages);
        setFilteredCars(carsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesBrand = selectedBrand
        ? car.Model.toLowerCase().includes(selectedBrand.toLowerCase())
        : true;
      const matchesSearchQuery =
        car.Model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.Name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearchQuery;
    });
    setFilteredCars(filtered);
  }, [selectedBrand, searchQuery, cars]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

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
    <div className="inventory">
      <div className="featured" data-aos="fade-left">
        <h1 className="header">Our Featured Cars</h1>
        <div className="cards">
          {cars
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

      
      <div className="car-list">
        <div className="car-nav">
          <h1>Our Inventory</h1>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="filtered-cars">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Link to={`/car/${car.id}`} key={car.id}>
                <div className="card">
                  <img src={car.imageUrl} alt={car.Model} />
                  <div className="text">
                    <p>{car.Name} {car.Model} {car.Production_Year}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-cars-message">No cars were found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
