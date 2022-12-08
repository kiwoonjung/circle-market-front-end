import "../Header/Header.scss";
import menu from "../../assets/images/icons/menu.svg";
import user from "../../assets/images/icons/user.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className="header-container">
        <div>logo</div>
        <div className="header-container__icon">
          <img src={menu} alt="menu.svg" />
          <Link to="/login">
            <img src={user} alt="user.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
