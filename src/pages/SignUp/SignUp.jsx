import "./SignUp.scss";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { useState } from "react";
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

  const navigate = useNavigate();

  function handleSignUp(event) {
    // event.preventDefault();
    axios.post("http://localhost:8080/api/auth/signup", {
      email: useremail,
      name: username,
      password: userpassword,
    });
    alert("New user Added!");
    navigate("/login");
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const email = event.target[0].value;
    const displayName = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

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
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            handleSignUp();
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="addItem-background">
      <div className="addItem-wrapper">
        <Header />
        <div>
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
                <input style={{ display: "none" }} type="file" id="file" />
                <label className="signup__input-avatar-label" htmlFor="file">
                  <img
                    className="signup__input-avatar"
                    src={defaultAvatar}
                    alt="defaultAvatar"
                  />
                  <span>Add an avatar</span>
                </label>
              </div>

              <div className="signup__btn-container">
                <button
                  disabled={loading}
                  className="signup__btn"
                  type="submit"
                >
                  SIGN UP
                </button>
                {loading &&
                  "Uploading and compressing the image please wait..."}
                {err && <span>Something went wrong</span>}
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
