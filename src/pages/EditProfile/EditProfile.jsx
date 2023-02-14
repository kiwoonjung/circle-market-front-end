import "./EditProfile.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function EditProfile() {
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([]);

  useEffect(() => {
    if (newImages.length < 1) return;
    const newImageUrls = [];
    newImages.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImagesURLs(newImageUrls);
  }, [newImages]);

  function onImageChange(event) {
    setNewImages([...event.target.files]);
  }

  /*
   * Get user data
   * send JWT token as part of request headers
   * token is decoded on the server and if valid sends back a user object
   */

  const loadProfile = (jwtToken) => {
    const decode = jwt_decode(jwtToken);
    axios
      .get(`http://localhost:8080/api/auth/findOneUser/${decode.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setUsername(response.data[0].name);
        if (response.data[0].imageUrl) {
          setUserAvatar(response.data[0].imageUrl);
        } else {
          return setUserAvatar(defaultAvatar);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    // if JWT token exists try to load the user profile, user object
    if (jwtToken) {
      loadProfile(jwtToken);
    }
  }, []);

  return (
    <div>
      <div className="editprofile">
        <form>
          <div className="edittprofile__avatar-container">
            <img className="editprofile__avatar" src={userAvatar} />
          </div>
          <div className="editprofile__info">
            <input
              className="editprofile__info--name"
              defaultValue={username}
            ></input>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
