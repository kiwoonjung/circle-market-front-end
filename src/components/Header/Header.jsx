import "../Header/Header.scss";
// import menu from "../../assets/images/icons/menu.svg";
// import user from "../../assets/images/icons/user.svg";
import { Link } from "react-router-dom";

export default function Header() {
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
            <input className="header-input" type="checkbox" id="hamburger1" />
            <label className="header-label" for="hamburger1"></label>

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
