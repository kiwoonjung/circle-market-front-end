import "./Profile.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [lists, setLists] = useState([]);

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

  const getPostsByUserId = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findPostsByUserId/${id}`)
      .then((response) => {
        setLists(response.data);
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPostsByUserId();
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-background">
        <div className="profile-wrapper">
          <div className="profile">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={userAvatar} />
            </div>
            <div className="profile__username">{user}</div>
          </div>

          <div className="mylist">
            {/* lists in map */}
            {lists.map((list, i) => {
              return (
                <Link key={i} to={`/item-details/${list._id}`}>
                  <div className="mylist__img-container" key={i}>
                    <img
                      className="mylist__img"
                      src={`http://localhost:8080/${list.imageUrl}`}
                    />

                    <div className="mylist__title">{list.title}</div>
                    <div>{list.address}</div>
                    <div>${list.price}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
