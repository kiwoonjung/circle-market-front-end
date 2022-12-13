import "./AddItem.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { v4: uuid } = require("uuid");

export default function AddItem() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([]);

  // const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [title_Error, setTitle_Error] = useState("");
  const [category_Error, setCategory_Error] = useState("");
  const [price_Error, setPrice_Error] = useState("");
  const [description_Error, setDescription_Error] = useState("");

  useEffect(() => {
    console.log(images[0]);
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImagesURLs(newImageUrls);
  }, [images]);

  function onImageChange(event) {
    setImages([...event.target.files]);
  }

  // useEffect(() => {
  //   if (image !== "") {
  //     setImage_Error(null);
  //   } else {
  //     setImage_Error(true);
  //   }
  // }, [image]);

  useEffect(() => {
    if (title !== "") {
      setTitle_Error(null);
    } else {
      setTitle_Error(true);
    }
  }, [title]);

  useEffect(() => {
    if (category !== "") {
      setCategory_Error(null);
    } else {
      setCategory_Error(true);
    }
  }, [category]);

  useEffect(() => {
    if (price !== "") {
      setPrice_Error(null);
    } else {
      setPrice_Error(true);
    }
  }, [price]);

  useEffect(() => {
    if (description !== "") {
      setDescription_Error(null);
    } else {
      setDescription_Error(true);
    }
  }, [description]);

  function handlePost(event) {
    event.preventDefault();

    if (
      title_Error === true ||
      category_Error === true ||
      price_Error === true ||
      description_Error === true
    ) {
    } else {
      const formData = new FormData();
      formData.append("images", images[0]);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);

      axios
        .post("http://localhost:8080/api/post/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("New user Added!");
      navigate("/");
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={handlePost}>
        <div className="addItem__img-container">
          {imagesURLs.map((imageSrc) => (
            <img
              id={uuid}
              className="addItem__img"
              src={imageSrc}
              alt={imageSrc.name}
            />
          ))}
        </div>
        <div className="addItem__btn-container">
          <input
            className="addItem__btn-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />
        </div>

        <div className="addItem__title-container">
          <label className="addItem__title-label">
            Title
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="addItem__title-input"
              type="text"
              name="title"
            />
          </label>
        </div>

        <div className="addItem__second-container">
          <div className="addItem__category-container">
            <label className="addItem__category-label">
              Category
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="addItem__category-select"
                type="text"
                name="category"
              >
                <option value="Antiques">Antiques</option>
                <option value="Appliances">Appliances</option>
                <option value="Arts+crafts">Arts+crafts</option>
                <option value="Atv & Utv & Snow">Atv & Utv & Snow</option>
                <option value="Auto Parts">Auto Parts</option>
                <option value="Aviation">Aviation</option>
                <option value="Baby & Kid">Baby & Kid</option>
                <option value="Barter">Barter</option>
                <option value="Beauty & Health">Beauty & Health</option>
                <option value="Bike Parts">Bike Parts</option>
                <option value="Bikes">Bikes</option>
                <option value="Boat Parts">Boat Parts</option>
                <option value="Boats">Boats</option>
                <option value="Books">Books</option>
                <option value="Business">Business</option>
                <option value="Cars & Trucks">Cars & Trucks</option>
                <option value="Cds & Dvd & Vhs<">Cds & Dvd & Vhs</option>
                <option value="Cell Phones">Cell Phones</option>
                <option value="Clothes & Acc">Clothes & Acc</option>
                <option value="Collectibles">Collectibles</option>
                <option value="Computer Parts">Computer Parts</option>
                <option value="Computers">Computers</option>
                <option value="Electronics">Electronics</option>
                <option value="Farm & Garden">Farm & Garden</option>
                <option value="Free">Free</option>
                <option value="Furniture">Furniture</option>
                <option value="Garage Sale">Garage Sale</option>
                <option value="General">General</option>
                <option value="Heavy equip">Heavy equip</option>
                <option value="Household">Household</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Materials">Materials</option>
                <option value="Motorcycle Parts">Motorcycle Parts</option>
                <option value="Motorcycles">Motorcycles</option>
                <option value="Music & Instruments">Music & Instruments</option>
                <option value="Photo & Video">Photo & Video</option>
                <option value="Rvs & Camp">Rvs & Camp</option>
                <option value="Sporting">Sporting</option>
                <option value="Tickets">Tickets</option>
                <option value="Tools">Tools</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Trailers">Trailers</option>
                <option value="Video Gaming">Video Gaming</option>
                <option value="Wanted">Wanted</option>
                <option value="Wheels & Tires">Wheels & Tires</option>
              </select>
            </label>
          </div>

          <div className="addItem__price-container">
            <label className="addItem__price-label">
              Price
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="addItem__price-input"
                type="text"
                name="price"
              />
            </label>
          </div>
        </div>

        <div className="addItem__description-container">
          <label>
            Description
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="addItem__description-textarea"
              type="text"
              name="description"
              cols="30"
              rows="10"
            ></textarea>
          </label>
        </div>

        <div className="addItem__btn-container">
          <button className="addItem__btn-post" type="submit">
            POST
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}
