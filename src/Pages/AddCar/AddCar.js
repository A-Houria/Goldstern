import Style from "../../styles/AddCar/Addcar.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Images: [],
    Img: "",
    Name: "",
    Model: "",
    Price: "",
    Production_Year: "",
    Condition: "",
    Description: "",
    Featured: false,
    Hidden: false,
    Engine_Specs: [],
    Exterior: [],
    Interior: [],
    Special_Features: [],
  });
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      if (!file.name.toLowerCase().endsWith(".webp")) {
        alert(`${file.name} is not a .webp file.`);
        continue;
      }

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
    e.target.value = null;
  };

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
    // Validation
    if (!formData.Images || formData.Images.length < 1) {
      alert("Please upload at least one image.");
      return;
    }

    const requiredFields = [
      "Name",
      "Model",
      "Price",
      "Production_Year",
      "Condition",
    ];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit this new car?"
    );
    if (!confirmed) return;

    try {
      await addDoc(collection(db, "Cars"), formData);
      alert("New car added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add new car:", error);
      alert("Failed to add new car.");
    }
  };

  return (
    <div className={Style.addCar}>
      <div className={Style.cont}>
        <h1 className={Style.mainTitle}>Add New Car</h1>

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

export default AddCar;
