import "./ItemDetails.scss";
import like from "../../assets/images/icons/like.svg";
import comment from "../../assets/images/icons/comment.svg";
import view from "../../assets/images/icons/view.svg";
import Header from "../../components/Header/Header";
import AddComment from "../../components/AddComment/AddComment";
import CommentList from "../../components/CommentList/CommentList";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemDetails() {
  const [item, setItem] = useState({});
  const [itemImage, setItemImage] = useState([]);
  const [userName, setUserName] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const { id } = useParams();

  const getSinglePost = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findOnePost/${id}`)
      .then((response) => {
        setItemImage(response.data[0].imageUrl);
        setItem(response.data[0]);
        getSingleUser(response.data[0].userid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleUser = async (userId) => {
    await axios
      .get(`http://localhost:8080/api/auth/findOneUser/${userId}`)
      .then((response) => {
        setUserName(response.data[0].name);
        setUserAvatar(response.data[0].imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <div className="addItem-background">
      <div className="addItem-wrapper">
        <Header />
        <div className="itemDetails__img-container">
          {itemImage.map((singleImage, i) => {
            return (
              <img
                key={i}
                className="itemDetails__img"
                src={singleImage.url}
                alt={itemImage}
              />
            );
          })}
        </div>

        <div className="user-wrapper">
          <div className="user-info">
            <div className="user-info__avatar-container">
              <img
                className="user-info__avatar"
                src={userAvatar}
                alt="userAvatar"
              />
            </div>

            <div className="user-info__container">
              <div>
                <div>{userName}</div>
                <div>{item.address}</div>
              </div>

              <div>
                <div>★★★★★</div>
                <div>Circle Lv 1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="title-container">
          <div className="title-content">{item.title}</div>
          <div>${item.price}</div>
        </div>

        <div className="category-container">
          <div>{item.category}</div>
          <div>{item.timestamp}</div>
        </div>

        <div className="description-container">
          <div className="description-content">{item.description}</div>
        </div>
        <div className="description-second">
          <div className="description__icon-container">
            <div className="description__icon-group">
              <img className="description__icon" src={like} alt="like.svg" />
              <div className="description__text">68</div>
            </div>

            <div className="description__icon-group">
              <img
                className="description__icon"
                src={comment}
                alt="comment.svg"
              />
              <div className="description__text">21</div>
            </div>

            <div className="description__icon-group">
              <img className="description__icon" src={view} alt="view.svg" />
              <div className="description__text">179</div>
            </div>
          </div>
          <div className="chat-container">
            <button className="chat-btn">Chat with Seller</button>
          </div>
        </div>

        <AddComment />
        <CommentList />
        <Footer />
      </div>
    </div>
  );
}
