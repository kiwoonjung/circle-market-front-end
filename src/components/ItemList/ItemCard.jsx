import "./ItemCard.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemList() {
  const { item_id } = useParams();

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
        <h3>What's new on the list today</h3>
      </div>
      <div className="item">
        {/* posts in map */}
        {posts.map((post, i) => {
          return (
            <Link key={i} to={`item-details/${post._id}`}>
              <div className="item__img-container" key={i}>
                <img
                  className="item__img"
                  src={`http://localhost:8080/${post.imageUrl}`}
                />

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
