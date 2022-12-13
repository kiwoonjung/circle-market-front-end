import "./ItemCard.scss";
import iPhone from "../../assets/images/list/iPhoneXR-1.jpeg";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemList(props) {
  const { item_id } = useParams();

  const [posts, setPosts] = useState([]);

  //FIND ALL POSTS in POST DATABASE
  const getPosts = async () => {
    await axios
      .get("http://localhost:8080/api/post/findAll")
      .then((response) => {
        console.log(response.data);
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
      <div className="list-header">
        <h3>What's new on the list today</h3>
      </div>

      <div className="item">
        <Link to={`/${props.id}`}>
          <div className="item__container">
            <div>
              <img
                className="item__img-container"
                src={iPhone}
                alt="iPhoneXR-1.jpeg"
              />
            </div>
            <div>iPhone XR 256 GB</div>
            <div>Vancouver Victoria & 49th Drive</div>
            <div>$340</div>
          </div>
        </Link>

        {/* posts in map */}
        {posts.map((post, i) => {
          return (
            <div key={i}>
              <img className="item__img-container" src={post.imageUrl} alt="" />
              <p>{post.title}</p>
              <p>{post.address}</p>
              <p>{post.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
