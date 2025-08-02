import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // make sure this points to your Firestore db

const Dashboard = () => {
  const [heroImgUrl, setHeroImgUrl] = useState("");
  const [cars, setCars] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (carId) => {
    navigate(`/dashboard/edit-car/${carId}`);
  };
  const handleAdd = (carId) => {
    navigate(`/dashboard/add-car`);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Cars"));
        const carData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const car = doc.data();
            try {
              const imageRef = ref(storage, car.Img);
              const imageUrl = await getDownloadURL(imageRef);
              return { id: doc.id, ...car, imageUrl };
            } catch (err) {
              console.error("Error loading car image:", err);
              return { id: doc.id, ...car, imageUrl: "" };
            }
          })
        );
        setCars(carData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const listRef = ref(storage, "Hero/");
        const res = await listAll(listRef);
        if (res.items.length > 0) {
          const imageRef = res.items[0];
          const url = await getDownloadURL(imageRef);
          setHeroImgUrl(url);
        } else {
          console.log("No image found in Hero folder.");
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".webp")) {
      alert("Only .webp files are allowed.");
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async () => {
      const { width, height } = image;
      const ratio = width / height;

      if (width > 1200) {
        alert("Image width must be 1200px or less.");
        return;
      }

      if (Math.abs(ratio - 16 / 9) > 0.01) {
        alert("Image must have a 16:9 aspect ratio.");
        return;
      }

      try {
        const imageRef = ref(storage, "Hero/hero.webp");
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setHeroImgUrl(url);
        alert("Hero image updated successfully!");
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Failed to upload image.");
      }
    };
  };

  return (
    <div className="dashboard">
      <div className="cont">
        <h1 className="dash-title">Dashboard</h1>
        <div className="hero-section">
          <div className="title">
            <h1>Hero Section</h1>
            <input
              type="file"
              accept=".webp"
              style={{ display: "none" }}
              id="hero-upload"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => document.getElementById("hero-upload").click()}
            >
              *Replace
            </button>
          </div>
          <div className="card">
            <div className="text">
              <p>(*Image must have a .webp file extension,</p>
              <p>*Image must have 16/9 ratio,</p>
              <p>*Image must have a 1200px maximum width)</p>
            </div>
            {heroImgUrl && (
              <img
                loading="lazy"
                src={heroImgUrl}
                alt="hero"
                className="hero"
              />
            )}
          </div>
        </div>
        <div className="cars-section">
          <div className="title">
            <h1>Cars Section</h1>
            <button onClick={handleAdd}>*Add New</button>
          </div>
          <div className="cards">
            {cars.map((car) => (
              <div className="card" key={car.id}>
                <img src={car.imageUrl} alt={car.Model} />
                <div className="text">
                  <p>
                    {car.Name} {car.Model} {car.Production_Year}
                  </p>
                </div>
                <div className="settings">
                  <button className="edit" onClick={() => handleEdit(car.id)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => setConfirmDeleteId(car.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {confirmDeleteId && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Are you sure you want to delete this car?</p>
                <div className="modal-buttons">
                  <button
                    className="yes"
                    onClick={async () => {
                      try {
                        const carToDelete = cars.find(
                          (c) => c.id === confirmDeleteId
                        );

                        if (!carToDelete) {
                          alert("Car not found.");
                          return;
                        }

                        // Delete image files from Firebase Storage
                        if (Array.isArray(carToDelete.Images)) {
                          const deletePromises = carToDelete.Images.map(
                            (path) => {
                              const imageRef = ref(storage, path);
                              return deleteObject(imageRef);
                            }
                          );
                          await Promise.all(deletePromises);
                        }

                        // Delete Firestore document
                        await deleteDoc(doc(db, "Cars", confirmDeleteId));

                        // Update state
                        setCars((prev) =>
                          prev.filter((c) => c.id !== confirmDeleteId)
                        );
                        alert("Car and its images deleted successfully.");
                      } catch (error) {
                        alert("Failed to delete car or its images.");
                        console.error(error);
                      } finally {
                        setConfirmDeleteId(null);
                      }
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="no"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="blogs-section">
          <div className="title">
            <h1>Blogs Section</h1>
            <button>*Add New</button>
          </div>
          <div className="cards">
            <img src=".\Icons\traffic-barrier.png" alt="Under Construction" />
            <img src=".\Icons\traffic-barrier.png" alt="Under Construction" />
            <img src=".\Icons\worker.png" alt="Under Construction" />
            <img src=".\Icons\work-in-progress.png" alt="Under Construction" />
            <img src=".\Icons\traffic-barrier.png" alt="Under Construction" />
            <img src=".\Icons\traffic-barrier.png" alt="Under Construction" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
