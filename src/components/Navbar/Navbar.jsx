import "../Navbar/Navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <Link to="/">
        <span className="navbar__logo">Circle Market</span>
      </Link>
      <div className="navbar__user">
        <img className="navbar__user--img" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className="navbar__button">
          Logout
        </button>
      </div>
    </div>
  );
}
