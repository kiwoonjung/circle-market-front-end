import "../Header/Header.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");

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
      .get("http://localhost:8080/api/auth/users", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setLoggedIn(true);
        setUser(response.data[0].name);
        setUserAvatar("http://localhost:8080" + response.data[0].imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="content">
          <nav className="header-nav">
            <Link to="/">
              <div className="header-logo">
                <div>Logo</div>
              </div>
            </Link>
            <div className="header-user-container">
              <div className="header-avatar-container">
                <img
                  className="user-avatar"
                  src={userAvatar}
                  alt="user-avatar"
                />
              </div>
              <div className="header-user">{user}</div>
            </div>
            <input className="header-input" type="checkbox" id="hamburger1" />
            <label className="header-label" htmlFor="hamburger1"></label>

            <ul className="nav-links">
              <li className="nav-li">
                <Link to="/login">
                  <div className="nav-a">LOGIN</div>
                </Link>
              </li>
              <li className="nav-li">
                <a className="nav-a" href="#">
                  MY PROFILE
                </a>
              </li>
              <li className="nav-li">
                <Link to="/add-item">
                  <div className="nav-a" href="#">
                    ADD POST
                  </div>
                </Link>
              </li>
              <li className="nav-li">
                <a className="nav-a" href="#">
                  LOGOUT
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
