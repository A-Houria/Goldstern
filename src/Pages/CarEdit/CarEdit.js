import Style from "../../styles/EditCar/Editcar.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  // Handle upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      if (!file.name.toLowerCase().endsWith(".webp")) {
        alert(`${file.name} is not a .webp file.`);
        continue;
      }

      // Validate image using FileReader + Image
      const isValid = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const ratio = img.width / img.height;

            if (img.width > 1200) {
              alert(`${file.name} is too wide (max 1200px).`);
              resolve(false);
            } else if (Math.abs(ratio - 3 / 2) > 0.01) {
              alert(`${file.name} does not have a 3:2 ratio.`);
              resolve(false);
            } else {
              resolve(true);
            }
          };
          img.onerror = () => resolve(false);
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

      if (!isValid) continue;

      try {
        const fileName = `${Date.now()}_${file.name}`;
        const imageRef = ref(storage, `Cars/${fileName}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const newPath = `Cars/${fileName}`;

        // Update state
        setFormData((prev) => ({
          ...prev,
          Images: [...(prev.Images || []), newPath],
        }));
        setImageUrls((prev) => [...prev, url]);

        console.log(`${file.name} uploaded successfully.`);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        alert(`Upload failed for ${file.name}`);
      }
    }

    // ✅ Reset input value so selecting same files again will trigger onChange
    e.target.value = null;
  };

  // Load image URLs from paths
  useEffect(() => {
    const fetchImageURLs = async () => {
      if (formData?.Images?.length) {
        try {
          const urls = await Promise.all(
            formData.Images.map(async (path) => {
              const imgRef = ref(storage, path);
              return await getDownloadURL(imgRef);
            })
          );
          setImageUrls(urls);
        } catch (error) {
          console.error("Failed to load image URLs:", error);
        }
      }
    };

    fetchImageURLs();
  }, [formData]);

  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, "Cars", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar(docSnap.data());
          setFormData(docSnap.data());
        } else {
          alert("Car not found.");
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayItemChange = (field, index, value) => {
    const updatedArray = [...(formData[field] || [])];
    updatedArray[index] = value;
    handleChange(field, updatedArray);
  };

  const handleAddItem = (field) => {
    const updatedArray = [...(formData[field] || []), ""];
    handleChange(field, updatedArray);
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = [...(formData[field] || [])];
    updatedArray.splice(index, 1);
    handleChange(field, updatedArray);
  };

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to submit changes?"
    );
    if (!confirmed) return;

    try {
      const docRef = doc(db, "Cars", id);
      await updateDoc(docRef, formData);
      alert("Car updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update car.");
    }
  };

  if (!car || !formData) return <p>Car not found.</p>;

  return (
    <div className={Style.editCar}>
      <div className={Style.cont}>
        <h1 className={Style.mainTitle}>Edit car details</h1>

        <div className={Style.imagesSection}>
          <div className={Style.imagesTitle}>
            <h1>Images</h1>
            <input
              type="file"
              accept=".webp"
              multiple
              style={{ display: "none" }}
              id="upload-image"
              onChange={handleImageUpload}
            />
            <button
              className={Style.addImage}
              onClick={() => document.getElementById("upload-image").click()}
            >
              *Add Image
            </button>
          </div>
          <div className={Style.rules}>
            <p>(*Image must have a .webp file extension,</p>
            <p>*Image must have 3/2 ratio,</p>
            <p>*Image must have a 1200px maximum width)</p>
          </div>
          <div className={Style.imagesCards}>
            {imageUrls.map((url, index) => (
              <div key={index} className={Style.imageCard}>
                <img src={url} alt={`Car ${index}`} />
                <div className={Style.imageActions}>
                  <button
                    className={Style.main}
                    onClick={() => handleChange("Img", formData.Images[index])}
                    disabled={formData.Images[index] === formData.Img}
                  >
                    {formData.Images[index] === formData.Img
                      ? "Main Image"
                      : "Set as Main"}
                  </button>
                  <button
                    className={Style.delete}
                    onClick={() => handleRemoveItem("Images", index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {[
          "Name",
          "Model",
          "Price",
          "Production_Year",
          "Condition",
          "Description",
        ].map((field) => (
          <div key={field} className={Style.stringSection}>
            <h1>{field}</h1>
            {field === "Description" ? (
              <textarea
                rows={6}
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={formData[field] || ""}
                onChange={(e) =>
                  handleChange(
                    field,
                    field === "Price"
                      ? e.target.value.replace(/ ?EGP$/, "") + " EGP"
                      : e.target.value
                  )
                }
              />
            )}
          </div>
        ))}

        {["Featured", "Hidden"].map((field) => (
          <div className={Style.boolSection} key={field}>
            <h1>{field}</h1>
            <input
              type="checkbox"
              id={`${field.toLowerCase()}-checkbox`}
              checked={formData[field] || false}
              onChange={(e) => handleChange(field, e.target.checked)}
            />
          </div>
        ))}

        {["Engine_Specs", "Exterior", "Interior", "Special_Features"].map(
          (field) => (
            <div key={field} className={Style.arraySection}>
              <h1>{field}</h1>
              {(formData[field] || []).map((item, index) => (
                <div key={index} className={Style.arrayItem}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange(field, index, e.target.value)
                    }
                  />
                  <button onClick={() => handleRemoveItem(field, index)}>
                    Delete
                  </button>
                </div>
              ))}
              <button
                className={Style.arrayBtn}
                onClick={() => handleAddItem(field)}
              >
                + Add
              </button>
            </div>
          )
        )}

        <div>
          <button className={Style.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
