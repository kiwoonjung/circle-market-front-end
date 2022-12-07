import "../Header/Header.scss";
import menu from "../../assets/images/icons/menu.svg";
import user from "../../assets/images/icons/user.svg";
// import Search from "../Search/Search";

export default function Header() {
  return (
    <div>
      <div className="header-container">
        <div>logo</div>
        <div className="header-container__icon">
          <img src={menu} alt="menu.svg" />
          <img src={user} alt="user.svg" />
        </div>
      </div>
    </div>
  );
}
