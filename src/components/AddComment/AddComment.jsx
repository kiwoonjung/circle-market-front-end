import "./AddComment.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function AddComment() {
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const getSinglePost = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findOnePost/${id}`)
      .then((response) => {
        setItem(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    const decode = jwt_decode(jwtToken);

    axios
      .get(`http://localhost:8080/api/auth/findOneUser/${decode.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setUserAvatar(response.data[0].imageUrl);
        setUserId(response.data[0]._id);
        setUserName(response.data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handlePost(event) {
    event.preventDefault();

    let commentForm = {
      useravatar: userAvatar,
      userid: userId,
      name: userName,
      comment: comment,
      timestamp: Date.now(),
    };
    axios
      .post(`http://localhost:8080/api/post/addComment/${id}`, commentForm)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form className="comment" onSubmit={handlePost}>
        <div className="comment__container">
          <div className="comment__info-container">
            <div className="comment__avatar-container">
              <img className="comment__avatar" src={userAvatar} alt="" />
            </div>
            <div>{userName}</div>
            <div className="comment__userid">{userId}</div>
          </div>
          <label className="comment__label">
            Comment
            <textarea
              className="comment__input"
              type="text"
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>

        <div className="comment__btn-container">
          <button type="submit" className="comment__btn-comment">
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
}
