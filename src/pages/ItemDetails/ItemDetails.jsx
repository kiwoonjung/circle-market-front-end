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
  const { id } = useParams();

  const getSinglePost = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findOneRequest/${id}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <div>
      <Header />
      <div className="itemDetails__img-container">
        <img
          className="itemDetails__img"
          src={`http://localhost:8080/${item.imageUrl}`}
          alt={item.imageUrl}
        />
      </div>

      <div className="user-wrapper">
        <div className="user-info">
          <div className="user-info__avatar-container">
            <div className="user-info__default-avatar"></div>
          </div>

          <div className="user-info__container">
            <div>
              <div>Domo</div>
              <div>Vancouver</div>
            </div>

            <div>
              <div>★★★★★</div>
              <div>Circle Lv 1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="title-container">
        <div>{item.title}</div>
        <div>{item.price}</div>
      </div>

      <div className="category-container">
        <div>{item.category}</div>
        <div>{item.timestamp}</div>
      </div>

      <div className="description-container">
        <div>{item.description}</div>
      </div>

      <div className="description__icon-container">
        <div className="description__icon-group">
          <img className="description__icon" src={like} alt="like.svg" />
          <div className="description__text">78</div>
        </div>

        <div className="description__icon-group">
          <img className="description__icon" src={comment} alt="comment.svg" />
          <div className="description__text">12</div>
        </div>

        <div className="description__icon-group">
          <img className="description__icon" src={view} alt="view.svg" />
          <div className="description__text">167</div>
        </div>
      </div>

      <AddComment />
      <CommentList />
      <Footer />
    </div>
  );
}
