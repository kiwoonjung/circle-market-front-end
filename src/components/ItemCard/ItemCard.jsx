import "./ItemCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import mobile1 from "../../assets/images/background/Mobile-1.png";
import mobile2 from "../../assets/images/background/Mobile-2.png";
import tablet from "../../assets/images/background/Tablet.png";
import desktop from "../../assets/images/background/Desktop.png";
import Search from "../../components/Search/Search";
import axios from "axios";

export default function ItemCard() {
  const [posts, setPosts] = useState([]);

  //FIND ALL POSTS in POST DATABASE
  const getPosts = async () => {
    await axios
      .get("http://localhost:8080/api/post/findAllPosts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <span className="mobile1-text">Buy and Sell in your Circle</span>
      <div className="tablet-text">
        <div className="tablet-text__container">
          <div className="tablet-text__container1">
            <span className="tablet-text__container--text1">
              Buy and Sell in your Circle
            </span>
          </div>

          <div className="tablet-text__container2">
            <span className="tablet-text__container--text2">
              Chat with Verified Sellers
            </span>
          </div>
        </div>
      </div>
      <div>
        <img className="mobile1-img" src={mobile1} alt="mobile" />
        <img className="tablet-img" src={tablet} alt="tablet" />
        <img className="desktop-img" src={desktop} alt="desktop" />
      </div>

      <span className="mobile2-text">Chat with Verified Sellers</span>
      <div>
        <img className="mobile2-img" src={mobile2} alt="mobile2" />
      </div>

      <Search />
      <div className="list-header">
        <div className="list-title">What's new on the list today</div>
      </div>
      <div className="item-container">
        <div className="item">
          {/* posts in map */}
          {posts.map((post, i) => {
            return (
              <Link key={i} to={`item-details/${post._id}`}>
                <div className="item__img-container" key={i}>
                  <img className="item__img" src={post.imageUrl[0].url} />
                  <div className="item__title">{post.title}</div>
                  <div className="item__location">{post.address}</div>
                  <div className="item__price">${post.price}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="more">
        <button className="more__btn">See More</button>
      </div>
    </div>
  );
}
