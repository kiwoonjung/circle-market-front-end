import "./AddComment.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function AddComment() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const { id } = useParams();

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

    const form = new FormData();
    form.append("userAvatar", userAvatar);
    form.append("userid", userId);
    form.append("name", userName);
    form.append("comment", event.target.comment.value);

    axios
      .post(`http://localhost:8080/api/post/findOnePost/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
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
            <textarea className="comment__input" name="comment" type="text" />
          </label>
        </div>

        <div className="comment__btn-container">
          <button className="comment__btn-comment">Add Comment</button>
        </div>
      </form>
    </div>
  );
}
