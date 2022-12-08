import "./SignUp.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../../assets/images/icons/error.svg";
const { v4: uuid } = require("uuid");

export default function SignUp() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username_Error, setUsername_Error] = useState("");
  const [useremail_Error, setUseremail_Error] = useState("");
  const [userpassword_Error, setUserpassword_Error] = useState("");
  const [confirmPassword_Error, setConfirmPassword_Error] = useState("");

  useEffect(() => {
    if (username !== "") {
      setUsername_Error(null);
    } else {
      setUsername_Error(true);
    }
  }, [username]);

  useEffect(() => {
    if (useremail !== "") {
      setUseremail_Error(null);
    } else {
      setUseremail_Error(true);
    }
  }, [useremail]);

  useEffect(() => {
    if (userpassword !== "") {
      setUserpassword_Error(null);
    } else {
      setUserpassword_Error(true);
    }
  }, [userpassword]);

  useEffect(() => {
    if (confirmPassword !== "" || confirmPassword !== userpassword) {
      setConfirmPassword_Error(null);
    } else {
      setConfirmPassword_Error(true);
    }
  }, [confirmPassword]);

  function validatecontact_email(user_email) {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
    return re.test(user_email);
  }

  function handleSignUp(event) {
    event.preventDefault();

    if (
      username_Error === true ||
      useremail_Error === true ||
      userpassword_Error === true ||
      confirmPassword_Error === true
    ) {
    } else {
      axios.post(`${API_URL}/userdata`, {
        id: uuid(),
        username: username,
        useremail: useremail,
        userpassword: userpassword,
      });
      alert("Warehouse Added!");
      navigate("/");
    }
  }

  return (
    <div>
      <Header />
      <div>
        <div className="signup-logo">Sign Up</div>
        <div>
          <form className="signup" onSubmit={handleSignUp}>
            <div className="signup__input-container">
              <label className="signup__label">
                Email
                <input
                  onChange={(e) => setUseremail(e.target.value)}
                  className="signup__input-email"
                  type="text"
                  name="username"
                />
                {useremail_Error && (
                  <div className="signup__error-wrp">
                    <img className="signup__error-img" src={Error} alt="" />
                    <p className="signup__error-text">This field is required</p>
                  </div>
                )}
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Username
                <input
                  onChange={(e) => setUserpassword(e.target.value)}
                  className="signup__input-user"
                  type="text"
                  name="username"
                />
                {username_Error && (
                  <div className="signup__error-wrp">
                    <img className="signup__error-img" src={Error} alt="" />
                    <p className="signup__error-text">This field is required</p>
                  </div>
                )}
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Password
                <input
                  onChange={(e) => setUserpassword(e.target.value)}
                  className="signup__input-pw"
                  type="password"
                  name="password"
                />
                {userpassword_Error && (
                  <div className="signup__error-wrp">
                    <img className="signup__error-img" src={Error} alt="" />
                    <p className="signup__error-text">This field is required</p>
                  </div>
                )}
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Confirm Password
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="signup__input-confirm-pw"
                  type="password"
                  name="confirm-password"
                />
                {confirmPassword_Error && (
                  <div className="signup__error-wrp">
                    <img className="signup__error-img" src={Error} alt="" />
                    <p className="signup__error-text">This field is required</p>
                  </div>
                )}
              </label>
            </div>

            <div className="signup__btn-container">
              <button className="signup__btn" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
