import "./Profile.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import edit from "../../assets/images/icons/edit.svg";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [lists, setLists] = useState([]);

  const { id } = useParams();

  const getSingleUser = async () => {
    await axios
      .get(`http://localhost:8080/api/auth/findOneUser/${id}`)
      .then((response) => {
        setUser(response.data[0].name);
        setUserEmail(response.data[0].email);

        if (response.data[0].imageUrl) {
          setUserAvatar(response.data[0].imageUrl);
        } else {
          return setUserAvatar(defaultAvatar);
        }
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

  const deletePost = async (event) => {
    await axios
      .delete(`http://localhost:8080/api/post/delete/${id.data._id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="profile-background">
        <div className="profile-wrapper">
          <div className="profile">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={userAvatar} />
            </div>
            <div className="profile__info">
              <div className="profile__info--name">UserName: {user}</div>
              <div>Email: {userEmail}</div>
            </div>
          </div>

          <div className="mylist">
            {/* lists in map */}
            {lists.map((list, i) => {
              return (
                <Link key={i} to={`/item-details/${list._id}`}>
                  <div className="mylist__img-container" key={i}>
                    <img className="mylist__img" src={list.imageUrl[0].url} />
                    <div className="mylist__edit-container">
                      <div>
                        <div className="mylist__title">{list.title}</div>
                        <div className="mylist__location">{list.address}</div>
                        <div className="mylist__price">${list.price}</div>
                      </div>
                      <Link to={`/edit-item/${list._id}`}>
                        <img src={edit} alt="edit-icon" />
                      </Link>
                    </div>
                  </div>
                  {/* <button onClick={deletePost}>
                    <img src={delte} alt="edit-icon" />
                  </button> */}
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
