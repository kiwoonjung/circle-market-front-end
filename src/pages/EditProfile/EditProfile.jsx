import "./EditProfile.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function EditProfile() {
  const { userName, setUserName } = useState("");

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
      .get(`http://localhost:8080/api/auth/findOneUser/${decode.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setUserName(response.data[0].name);
        console.log(response.data[0].name);
        // setLoggedIn(true);
        // setUserAvatar(response.data[0].imageUrl);
        // setUserId(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <form className="editProfile">
          <input type="text" defaultValue={userName} />
        </form>
      </div>
      <Footer />
    </div>
  );
}
