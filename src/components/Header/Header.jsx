import "../Header/Header.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import logo from "../../assets/images/logo/CIRCLE LOGO.png";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
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
    const decode = jwt_decode(jwtToken);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/auth/findOneUser/${decode.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setLoggedIn(true);
        setUser(response.data[0].name);
        setUserId(response.data[0]._id);
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

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setUserAvatar("");
    localStorage.removeItem("jwt_token");
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="content">
          <nav className="header-nav">
            <Link to="/">
              <div className="header-logo">
                <div>
                  <img className="header-logo-img" src={logo} alt="logo" />
                </div>
              </div>
            </Link>

            {!loggedIn ? (
              <div></div>
            ) : (
              <div className="header-user-container">
                <div className="header-avatar-container">
                  <img
                    className="user-avatar"
                    src={userAvatar}
                    alt="userAvatar"
                  />
                </div>
                <div className="header-user">{user}</div>
              </div>
            )}

            <input className="header-input" type="checkbox" id="hamburger1" />
            <label className="header-label" htmlFor="hamburger1"></label>

            <ul className="nav-links">
              {!loggedIn ? (
                <li className="nav-li">
                  <Link to="/login">
                    <div className="nav-a">LOGIN</div>
                  </Link>
                </li>
              ) : (
                <li className="nav-li">
                  <button
                    className="nav-a"
                    onClick={() => {
                      signOut(auth);
                      handleLogout();
                      navigate("/");
                    }}
                  >
                    LOGOUT
                  </button>
                </li>
              )}
              <li className="nav-li">
                {!loggedIn ? (
                  <div></div>
                ) : (
                  <Link to={`/profile/${userId}`}>
                    <div className="nav-a" href="#">
                      MY PROFILE
                    </div>
                  </Link>
                )}
              </li>
              <li className="nav-li">
                {!loggedIn ? (
                  <div></div>
                ) : (
                  <Link to="/add-item">
                    <div className="nav-a" href="#">
                      ADD POST
                    </div>
                  </Link>
                )}
              </li>
              <li className="nav-li">
                {!loggedIn ? (
                  <div></div>
                ) : (
                  <Link to="/chatlist" target="_blank">
                    <div className="nav-a" href="#">
                      CHAT
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
