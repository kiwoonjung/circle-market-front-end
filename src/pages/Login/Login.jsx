import "./Login.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /*
   * Component Mount, check if localStorage has JWT token
   * if token exists verify JWT and login user
   */
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    // if JWT token exists try to load the user profile, user object
    if (jwtToken) {
      loadProfile(jwtToken);
    }
  }, []);

  /*
   * Get user data
   * send JWT token as part of request headers
   * token is decoded on the server and if valid sends back a user object
   */
  const loadProfile = (jwtToken) => {
    axios
      .get(`http://localhost:8080/users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setLoggedIn(true);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
   * Login function
   * post email and password to server
   * returns JWT if login success
   */
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/users/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.data.token) {
          loadProfile(response.data.token); // loadProfile, get user object
          localStorage.setItem("jwt_token", response.data.token);
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
    <div>
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
  );
}
