import Style from "../../styles/Inventory/Inventory.module.css";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
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
    <div className={Style.inventory}>
      <div className={Style.featured} data-aos="fade-left">
        <h1 className={Style.header}>Our Featured Cars</h1>
        <div className={Style.cards}>
          {cars
            .filter(
              (car) => car.Featured === true && car.imageUrl && !car.Hidden
            )
            .map((car) => (
              <Link to={`/car/${car.id}`} key={car.id}>
                <div className={Style.card} data-aos="fade-up">
                  <img loading="lazy" src={car.imageUrl} alt={car.Model} />
                  <div className={Style.text}>
                    <div className={Style.parts}>
                      <p>
                        {car.Name} {car.Model} {car.Production_Year}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className={Style.carList}>
        <div className={Style.carNav}>
          <h1>Our Inventory</h1>

          <div className={Style.searchBar}>
            <input
              type="text"
              className={Style.searchInput}
              placeholder="Search cars..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className={Style.filteredCars}>
          {filteredCars.filter((car) => car.imageUrl).length > 0 ? (
            filteredCars
              .filter((car) => car.imageUrl && !car.Hidden)
              .map((car) => (
                <Link to={`/car/${car.id}`} key={car.id}>
                  <div className={Style.card}>
                    <img loading="lazy" src={car.imageUrl} alt={car.Model} />
                    <div className={Style.text}>
                      <p>
                        {car.Name} {car.Model} {car.Production_Year}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p>No cars were found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
