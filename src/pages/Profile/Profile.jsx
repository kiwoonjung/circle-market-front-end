import "./Profile.scss";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");

  const { id } = useParams();

  const getSingleUser = async () => {
    await axios
      .get(`http://localhost:8080/api/auth/findOneUser/${id}`)
      .then((response) => {
        setUser(response.data[0].name);
        setUserAvatar("http://localhost:8080" + response.data[0].imageUrl);
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSingleUser();
  }, []);

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
      .get("http://localhost:8080/api/auth/findAllUsers", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        getSingleUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} />
        </div>
        <div>{user}</div>
      </div>
    </div>
  );
}
