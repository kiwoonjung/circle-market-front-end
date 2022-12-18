import "./ItemCard.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
      <div className="list-header">
        <div className="list-title">What's new on the list today</div>
      </div>
      <div className="item">
        {/* posts in map */}
        {posts.map((post, i) => {
          return (
            <Link key={i} to={`item-details/${post._id}`}>
              <div className="item__img-container" key={i}>
                <img className="item__img" src={post.imageUrl[0].url} />
                <div className="item__title">{post.title}</div>
                <div>{post.address}</div>
                <div>${post.price}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
