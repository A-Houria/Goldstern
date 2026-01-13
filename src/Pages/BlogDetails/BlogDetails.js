import Style from "../../styles/BlogDetails/BlogDetails.module.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "Blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          console.error("Blog not found");
        }
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className={Style.blogDetails}>
      <div className={Style.cont}>
        <img
          src={blog.mainImage}
          alt={blog.title}
          className={Style.mainImage}
        />
        <h1 className={Style.title}>{blog.title}</h1>
        <p className={Style.blogDetails}>By {blog.author}</p>
        <p className={Style.blogDetails}>
          {blog.createdAt?.toDate().toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <div className={Style.line}></div>
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className={Style.content}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
