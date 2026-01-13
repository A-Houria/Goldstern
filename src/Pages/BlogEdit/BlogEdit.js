import Style from "../../styles/BlogEdit/BlogEdit.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid"; // Add this
import { useRef, useMemo, useCallback } from "react"; // Add these

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const quillRef = useRef();

  const handleQuillImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/webp");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      if (file.type !== "image/webp") {
        alert("Only .webp images are allowed.");
        return;
      }

      const img = new Image();
      img.onload = async () => {
        if (img.width > 1200) {
          alert("Inline image width must be 1200px or less.");
          return;
        }

        try {
          const storageRef = ref(storage, `Blogs/${uuidv4()}_${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", downloadURL);
        } catch (err) {
          console.error("Quill image upload error:", err);
          alert("Image upload failed.");
        }
      };
      img.src = URL.createObjectURL(file);
    };
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ direction: "rtl" }, { align: [] }],
          ["image", "video"],
        ],
        handlers: {
          image: handleQuillImageUpload,
        },
      },
    }),
    [handleQuillImageUpload]
  );

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "Blogs", blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlog(data);
          setFormData(data);

          if (data.mainImage) {
            const imgRef = ref(storage, data.mainImage);
            const url = await getDownloadURL(imgRef);
            setImageUrl(url);
          }
        } else {
          alert("Blog not found.");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog.");
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".webp")) {
      alert("Only .webp files are allowed.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const ratio = img.width / img.height;
      if (img.width > 1200) {
        alert("Image width must be 1200px or less.");
        return;
      }

      try {
        const filename = `Blogs/${Date.now()}_${file.name}`;
        const imgRef = ref(storage, filename);
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);

        setFormData((prev) => ({ ...prev, mainImage: filename }));
        setImageUrl(url);

        alert("Image uploaded successfully.");
      } catch (err) {
        console.error("Failed to upload image:", err);
        alert("Upload failed.");
      }
    };
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to submit changes?"
    );
    if (!confirmed) return;

    try {
      const docRef = doc(db, "Blogs", blogId);
      await updateDoc(docRef, formData);
      alert("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update blog.");
    }
  };

  if (!blog || !formData) return <p>Blog not found.</p>;

  return (
    <div className={Style.editBlog}>
      <div className={Style.cont}>
        <h1 className={Style.mainTitle}>Edit Blog</h1>

        {/* Image Section */}
        <div className={Style.imagesSection}>
          <div className={Style.imagesTitle}>
            <h1>Main Image</h1>
            <input
              type="file"
              accept=".webp"
              style={{ display: "none" }}
              id="upload-image"
              onChange={handleImageUpload}
            />
            <button
              className={Style.addImage}
              onClick={() => document.getElementById("upload-image").click()}
            >
              *Replace Image
            </button>
          </div>
          <div className={Style.rules}>
            <p>(*Image must have a .webp extension,</p>
            <p>*Max width: 1200px)</p>
          </div>
          {imageUrl && (
            <img src={imageUrl} alt="Main Blog" className={Style.hero} />
          )}
        </div>

        {/* Text Fields */}
        {["title", "author", "summary"].map((field) => (
          <div key={field} className={Style.stringSection}>
            <h1>{field}</h1>
            <input
              type="text"
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}

        {/* Blog Content */}
        <div className={`${Style.stringSection} ${Style.contentSection}`}>
          <h1>Content</h1>
          <ReactQuill
            ref={quillRef}
            value={formData.content || ""}
            onChange={(value) => handleChange("content", value)}
            modules={quillModules}
            placeholder="Write your blog content here..."
            className={Style.quill}
          />
        </div>

        <button className={Style.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
