import "./Login.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/api/auth/signin`, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("jwt_token", response.data.accessToken);
          console.log(response.data);
          navigate("/");
          alert("Welcom username");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * Logout user
   */
  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   setUser(null);
  //   localStorage.removeItem("jwt_token");
  // };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <Header />
        <div>
          <div className="login-logo">Login</div>
          <div>
            <form className="login" onSubmit={handleLogin}>
              <div className="login__input-container">
                <label className="login__label">
                  Useremail
                  <input
                    className="login__input-user"
                    type="email"
                    name="email"
                  />
                </label>
              </div>

              <div className="login__input-container">
                <label className="login__label">
                  Password
                  <input
                    className="login__input-pw"
                    type="password"
                    name="password"
                  />
                </label>
              </div>

              <div className="login__forgot">Forgot Password?</div>
              <div className="login__btn-container">
                <button
                  onClick={navigate("/")}
                  className="login__btn"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>

          <div className="or">OR</div>

          <div className="mail">
            <Link to="/sign-up" className="mail__btn" type="button">
              Sign in with Email
            </Link>
          </div>

          <div className="google">
            <button className="google__btn" type="button">
              Sign in with Google
            </button>
          </div>

          <div className="facebook">
            <button className="facebook__btn" type="button">
              Sign in with Facebook
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
