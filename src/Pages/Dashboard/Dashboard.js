import Style from "../../styles/Dashboard/Dashboard.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [heroImgUrl, setHeroImgUrl] = useState("");
  const [cars, setCars] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [confirmDeleteBlogId, setConfirmDeleteBlogId] = useState(null);

  const [carsLoading, setCarsLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogsLoading(true);
      try {
        const q = query(collection(db, "Blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const blogList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEdit = (carId) => {
    navigate(`/dashboard/edit-car/${carId}`);
  };
  const handleAddCar = () => {
    navigate(`/dashboard/add-car`);
  };
  const handleAddBlog = () => {
    navigate(`/dashboard/add-blog`);
  };
  const handleEditBlog = (blogId) => {
    navigate(`/dashboard/edit-blog/${blogId}`);
  };

  const handleDeleteBlog = async () => {
    try {
      await deleteDoc(doc(db, "Blogs", confirmDeleteBlogId));
      setBlogs((prev) => prev.filter((b) => b.id !== confirmDeleteBlogId));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog.");
    } finally {
      setConfirmDeleteBlogId(null);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      setCarsLoading(true);
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
      } finally {
        setCarsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchHeroImage = async () => {
      setHeroLoading(true);
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
      } finally {
        setHeroLoading(false);
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
    <div className={Style.dashboard}>
      <div className={Style.cont}>
        <h1 className={Style.dashTitle}>Dashboard</h1>

        {/* Hero Section */}
        <div className={Style.heroSection}>
          <div className={Style.title}>
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
          <div className={Style.card}>
            <div className={Style.text}>
              <p>(*Image must have a .webp file extension,</p>
              <p>*Image must have 16/9 ratio,</p>
              <p>*Image must have a 1200px maximum width)</p>
            </div>
            {heroLoading ? (
              <div className={Style.loadingContainer}>
                <img loading="lazy" src="/Icons/Logo-black.webp" alt="" />
              </div>
            ) : (
              heroImgUrl && (
                <img
                  loading="lazy"
                  src={heroImgUrl}
                  alt="hero"
                  className={Style.hero}
                />
              )
            )}
          </div>
        </div>

        {/* Cars Section */}
        <div className={Style.carsSection}>
          <div className={Style.title}>
            <h1>Cars Section</h1>
            <button onClick={handleAddCar}>*Add New</button>
          </div>
          <div className={Style.cards}>
            {carsLoading ? (
              <div className={Style.loadingContainer}>
                <img loading="lazy" src="/Icons/Logo-black.webp" alt="" />
              </div>
            ) : cars.length === 0 ? (
              <h1>No cars Found!</h1>
            ) : (
              cars.map((car) => (
                <div className={Style.card} key={car.id}>
                  <img src={car.imageUrl} alt={car.Model} />
                  <div className={Style.text}>
                    <p>
                      {car.Name} {car.Model} {car.Production_Year}
                    </p>
                  </div>
                  <div className={Style.settings}>
                    <button
                      className={Style.edit}
                      onClick={() => handleEdit(car.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={Style.delete}
                      onClick={() => setConfirmDeleteId(car.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {confirmDeleteId && (
            <div className={Style.modalOverlay}>
              <div className={Style.modal}>
                <p>Are you sure you want to delete this car?</p>
                <div className={Style.modalButtons}>
                  <button
                    className={Style.yes}
                    onClick={async () => {
                      try {
                        const carToDelete = cars.find(
                          (c) => c.id === confirmDeleteId
                        );

                        if (!carToDelete) {
                          alert("Car not found.");
                          return;
                        }

                        if (Array.isArray(carToDelete.Images)) {
                          const deletePromises = carToDelete.Images.map(
                            (path) => {
                              const imageRef = ref(storage, path);
                              return deleteObject(imageRef);
                            }
                          );
                          await Promise.all(deletePromises);
                        }

                        await deleteDoc(doc(db, "Cars", confirmDeleteId));
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
                    className={Style.no}
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Blogs Section */}
        <div className={Style.blogsSection}>
          <div className={Style.title}>
            <h1>Blogs Section</h1>
            <button onClick={handleAddBlog}>*Add New</button>
          </div>
          <div className={Style.cards}>
            {blogsLoading ? (
              <div className={Style.loadingContainer}>
                <img loading="lazy" src="/Icons/Logo-black.webp" alt="" />
              </div>
            ) : blogs.length === 0 ? (
              <h1>No Blogs Found!</h1>
            ) : (
              blogs.map((blog) => (
                <div className={Style.card} key={blog.id}>
                  <div className={Style.image}>
                    <img
                      src={blog.mainImage || "/Icons/blog.jpg"}
                      alt={blog.title}
                    />
                  </div>
                  <div className={Style.text}>
                    <div className={Style.details}>
                      <p className={Style.blogTitle}>{blog.title}</p>
                      <p className={Style.author}>{blog.author}</p>
                      <p className={Style.date}>
                        {blog.createdAt?.toDate().toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <p className={Style.summary}>{blog.summary}</p>
                    </div>
                    <div className={Style.settings}>
                      <button
                        className={Style.edit}
                        onClick={() => handleEditBlog(blog.id)}
                      >
                        Edit
                      </button>
                      <button
                        className={Style.delete}
                        onClick={() => setConfirmDeleteBlogId(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {confirmDeleteBlogId && (
            <div className={Style.modalOverlay}>
              <div className={Style.modal}>
                <p>Are you sure you want to delete this blog post?</p>
                <div className={Style.modalButtons}>
                  <button className={Style.yes} onClick={handleDeleteBlog}>
                    Yes
                  </button>
                  <button
                    className={Style.no}
                    onClick={() => setConfirmDeleteBlogId(null)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
