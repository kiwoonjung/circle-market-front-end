import "./SignUp.scss";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { useState, useEffect } from "react";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import Error from "../../assets/images/icons/error.svg";

export default function SignUp() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [defaultAvatar, setDefaultAvatar] = "";

  const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  // const [userImageUrl, setUserImageUrl] = useState(defaultAvatar);

  const navigate = useNavigate();

  //REAL TIME IMAGE CHANGE
  const [images, setImages] = useState([]);
  const [imagesURLs, setImagesURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImagesURLs(newImageUrls);
  }, [images]);

  function onImageChange(event) {
    setImages([...event.target.files]);
  }

  const handleSubmit = async (event) => {
    // setLoading(true);
    event.preventDefault();
    const email = event.target[0].value;
    const displayName = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0] ? event.target[3].files[0] : null;

    // console.log(file);
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${email + "" + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: file ? downloadURL : null,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: file ? downloadURL : null,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            //CREATE A NEW USER TO MONGO DB
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
              email: useremail,
              name: username,
              password: userpassword,
              imageUrl: file ? downloadURL : null,
            });
            alert("New user Added!");
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-wrapper">
        <Header />
        <div className="signup-logo">Sign Up</div>
        <div>
          <form className="signup" onSubmit={handleSubmit}>
            <div className="signup__input-container">
              <label className="signup__label">
                Email
                <input
                  required
                  className="signup__input-email"
                  type="email"
                  name="email"
                  onChange={(event) => setUserEmail(event.target.value)}
                />
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Username
                <input
                  required
                  className="signup__input-user"
                  type="text"
                  name="displayName"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Password
                <input
                  required
                  className="signup__input-pw"
                  type="password"
                  name="password"
                  onChange={(event) => setUserPassword(event.target.value)}
                />
              </label>
            </div>

            <div>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept="image/*"
                onChange={onImageChange}
              />
              <label className="signup__input-avatar-label" htmlFor="file">
                {/* IF THERE IS NO IMAGE URL (UPLOADED FILE) */}
                {!imagesURLs.length && (
                  <img
                    className="signup__input-avatar"
                    src={defaultAvatar}
                    alt=""
                  />
                )}

                {/* IF THERE IS IMAGE URL (UPLOADED FILE) */}
                {imagesURLs.map((imageSrc, i) => (
                  <img
                    key={i}
                    className="signup__input-useravatar"
                    src={imageSrc}
                    alt={imageSrc.name}
                  />
                ))}
                <span>Add an avatar</span>
              </label>
            </div>

            <div className="signup__btn-container">
              <button disabled={loading} className="signup__btn" type="submit">
                SIGN UP
              </button>
              {loading && "Uploading and compressing the image please wait..."}
              {err && <span>Something went wrong</span>}
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
