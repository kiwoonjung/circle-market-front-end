import "./ItemDetails.scss";
import comment from "../../assets/images/icons/comment.svg";
import Header from "../../components/Header/Header";
import CommentList from "../../components/CommentList/CommentList";
import Footer from "../../components/Footer/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";

export default function ItemDetails() {
  const [item, setItem] = useState({});
  const [itemImage, setItemImage] = useState([]);
  const [userName, setUserName] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [commentsNumber, setCommentsNumber] = useState();
  const { id } = useParams();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getSingleUser = async (userId) => {
    await axios
      .get(`https://api.circlemarket.ca/api/auth/findOneUser/${userId}`)
      .then((response) => {
        setUserName(response.data[0].name);
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

  // const getSinglePost = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/post/findOnePost/${id}`)
  //     .then((response) => {
  //       setItemImage(response.data[0].imageUrl);
  //       setItem(response.data[0]);
  //       setCommentsNumber(response.data[0].comments.length);
  //       getSingleUser(response.data[0].userid);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(
    (
      getSinglePost = async () => {
        await axios
          .get(`https://api.circlemarket.ca/api/post/findOnePost/${id}`)
          .then((response) => {
            setItemImage(response.data[0].imageUrl);
            setItem(response.data[0]);
            setCommentsNumber(response.data[0].comments.length);
            getSingleUser(response.data[0].userid);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    ) => {
      getSinglePost();
    },
    [id]
  );

  const dateFormat = () => {
    const foundDate = new Date().toLocaleDateString();
    return foundDate;
  };

  return (
    <div className="addItem-background">
      <div className="addItem-wrapper">
        <Header />
        <div className="itemDetails__img-container">
          <Slider {...settings}>
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
          </Slider>
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
              <div className="user-info__container--info">
                <div className="user-info__container--username">{userName}</div>
              </div>

              <div className="user-info__container--info">{item.address}</div>
            </div>
          </div>
        </div>

        <div className="title-container">
          <div className="title-content">{item.title}</div>
          <div className="title-price">${item.price}</div>
        </div>

        <div className="category-container">
          <div>{item.category}</div>
          <div>{dateFormat(item.timestamp)}</div>
        </div>

        <div className="description-container">
          <div className="description-content">{item.description}</div>
        </div>
        <div className="description-second">
          <div className="description__icon-container">
            <div className="description__icon-group">
              <img
                className="description__icon"
                src={comment}
                alt="comment.svg"
              />
              <div className="description__text">{commentsNumber}</div>
            </div>
            {/*
            <div className="description__icon-group">
              <img className="description__icon" src={view} alt="view.svg" />
              <div className="description__text">{item.views}</div>
            </div> */}
          </div>
          <div className="chat-container">
            <Link to="/chatlist" target="_blank">
              <button className="chat-btn">Chat with Seller</button>
            </Link>
          </div>
        </div>

        <CommentList />
        <Footer />
      </div>
    </div>
  );
}
