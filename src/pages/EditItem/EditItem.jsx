import "./EditItem.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
const { v4: uuid } = require("uuid");

export default function EditItem() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  const getSinglePost = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findOneRequest/${id}`)
      .then((response) => {
        // console.log(response.data[0]);
        setItem(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([]);
  // const [image, setImage] = useState("");

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImagesURLs(newImageUrls);
  }, [images]);

  function onImageChange(event) {
    setImages([...event.target.files]);
  }

  function handleEdit(event) {
    event.preventDefault();

    console.log(event.target.image.src);
    // console.log(event.target.title.value);

    let editFormSubmit = {
      // imageUrl: event.target.image.src,
      title: event.target.title.value,
    };

    axios
      .put(`http://localhost:8080/api/post/editItem/${id}`, editFormSubmit)
      .then((response) => {
        console.log(response);
        alert("Post Edited!");
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="addItem-background">
      <div className="addItem-wrapper">
        <Header />
        <form onSubmit={handleEdit}>
          <div className="addItem__img-container">
            <img
              name="image"
              className="addItem__img"
              src={`http://localhost:8080/${item.imageUrl}`}
              alt={item.imageUrl}
            />
            {/* {imagesURLs.map((imageSrc) => (
            <img
              id={uuid}
              className="addItem__img"
              src={imageSrc}
              alt={item.imageUrl}
            />
          ))} */}
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
                defaultValue={item.title}
                className="addItem__title-input"
                type="text"
                name="title"
                id="title"
              />
            </label>
          </div>

          <div className="addItem__second-container">
            <div className="addItem__category-container">
              <label className="addItem__category-label">
                Category
                <select
                  defaultValue={item.category}
                  className="addItem__category-select"
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
                  <option value="Music & Instruments">
                    Music & Instruments
                  </option>
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
                  defaultValue={item.price}
                  className="addItem__price-input"
                  type="text"
                  name="price"
                />
              </label>
            </div>
          </div>

          <div className="addItem__second-container">
            <div className="addItem__category-container">
              <label className="addItem__category-label">
                Address
                <select
                  defaultValue={item.address}
                  name="address"
                  className="addItem__category-select"
                >
                  <option value="Vancouver">Vancouver</option>
                  <option value="Nortn Vancouver">North Vancouver</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Burnaby">Burnaby</option>
                  <option value="Coquitlam">Coquitlam</option>
                  <option value="Surrey">Surrey</option>
                  <option value="Langley">Langley</option>
                </select>
              </label>
            </div>

            <div className="addItem__price-container">
              <label className="addItem__price-label">
                Condition
                <select
                  defaultValue={item.condition}
                  // onChange={(e) => setCondition(e.target.value)}
                  name="condition"
                  className="addItem__category-select"
                >
                  <option value="New">New</option>
                  <option value="Used Like New">Used - Like New</option>
                  <option value="Used - Good">Used - Good</option>
                  <option value="Used - Fair">Used - Fair</option>
                </select>
              </label>
            </div>
          </div>

          <div className="addItem__description-container">
            <label className="addItem__description-label">
              Description
              <textarea
                defaultValue={item.description}
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
              Edit
            </button>
          </div>
        </form>

        <Footer />
      </div>
    </div>
  );
}