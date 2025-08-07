import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "../../firebase";
import Style from "../../styles/AddBlog/AddBlog.module.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [mainImageFile, setMainImageFile] = useState(null);
  const [content, setContent] = useState("");
  const quillRef = useRef();

  // ✅ Inline image upload handler
  const handleImageUpload = useCallback(() => {
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
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      };
      img.src = URL.createObjectURL(file);
    };
  }, []);

  const modules = useMemo(
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
          image: handleImageUpload,
        },
      },
    }),
    [handleImageUpload]
  );

  // ✅ Upload main blog image
  const uploadMainImage = async () => {
    if (!mainImageFile) return null;
    const fileName = `mainImages/${uuidv4()}_${mainImageFile.name}`;
    const imageRef = ref(storage, fileName);
    await uploadBytes(imageRef, mainImageFile);
    return await getDownloadURL(imageRef);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "image/webp") {
      alert("Only .webp images are allowed.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width > 1200) {
        alert("Main image width must be 1200px or less.");
      } else {
        setMainImageFile(file);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  // ✅ Submit blog to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim to avoid accidental space-only input
    if (!title.trim() || !author.trim() || !summary.trim() || !content.trim()) {
      alert("❌ All fields (Title, Author, Summary, Content) are required.");
      return;
    }

    if (!mainImageFile) {
      alert("❌ Please select a main image (WEBP, max 1200px width).");
      return;
    }

    try {
      const mainImageURL = await uploadMainImage();
      await addDoc(collection(db, "Blogs"), {
        title: title.trim(),
        author: author.trim(),
        summary: summary.trim(),
        content: content.trim(),
        mainImage: mainImageURL,
        createdAt: Timestamp.now(),
      });

      alert("✅ Blog post added!");
      // Reset form
      setTitle("");
      setAuthor("");
      setSummary("");
      setContent("");
      setMainImageFile(null);
      navigate("/dashboard");
    } catch (err) {
      console.error("Firestore Error:", err);
      alert("❌ Failed to save blog post.");
    }
  };

  return (
    <div className={Style.addBlog}>
      <div className={Style.cont}>
        <h2 className={Style.mainTitle}>Add New Blog</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className={Style.blogTitle}
        />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          className={Style.name}
        />

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Blog Summary"
          className={Style.summary}
        />

        {/* Main image uploader with preview */}
        <div className={Style.imageUpload}>
          <label className={Style.uploadLabel}>
            <input
              type="file"
              accept="image/webp"
              onChange={handleMainImageChange}
              className={Style.mainImage}
            />
          </label>
          {mainImageFile && (
            <p className={Style.mainImageName}>
              🖼️ Selected: {mainImageFile.name}
            </p>
          )}
        </div>

        {/* Quill Editor */}
        <ReactQuill
          ref={quillRef}
          value={content || ""}
          onChange={setContent}
          modules={modules}
          placeholder="Write your blog content here..."
          className={Style.quill}
        />

        <button
          onClick={handleSubmit}
          className={Style.submit}
          disabled={
            !title.trim() ||
            !author.trim() ||
            !summary.trim() ||
            !content.trim() ||
            !mainImageFile
          }
        >
          Submit Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
