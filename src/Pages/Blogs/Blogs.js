import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Style from "../../styles/Blogs/Blogs.module.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "Blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const blogList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
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
      }
    };

    fetchBlogs();
  }, []);

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
    <div className={Style.blogs}>
      <div className={Style.cont}>
        <h1 className={Style.mainTitle}>Take a look at our latest blogs</h1>
        <div className={Style.cards}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                className={Style.card}
                key={blog.id}
              >
                <div className={Style.image}>
                  <img
                    src={blog.mainImage || "/Icons/blog.jpg"}
                    alt={blog.title}
                  />
                </div>
                <div className={Style.text}>
                  <h1 className={Style.blogTitle}>{blog.title}</h1>
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
              </Link>
            ))
          ) : (
            <p
              style={{
                letterSpacing: "3px",
                fontSize: "22px",
                fontWeight: "400",
              }}
            >
              No blogs found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
