import "./CommentList.scss";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";

export default function CommentList() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [comment, setComment] = useState("");

  const getComments = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/findAllComments/${id}`)
      .then((response) => {
        setComments(response.data[0].comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(
    (
      getComments = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/post/findAllComments/${id}`)
          .then((response) => {
            setComments(response.data[0].comments);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    ) => {
      getComments();
    },
    [id]
  );

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
      .get(`${process.env.REACT_APP_API_URL}/api/auth/findOneUser/${decode.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setUserId(response.data[0]._id);
        setUserName(response.data[0].name);
        if (response.data[0].imageUrl) {
          setUserAvatar(response.data[0].imageUrl);
        } else {
          return setUserAvatar(defaultAvatar);
        }
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
      .post(`${process.env.REACT_APP_API_URL}/api/post/addComment/${id}`, commentForm)
      .then((response) => {
        alert("Thank you for comment!");
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {localStorage.getItem("jwt_token") ? (
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
                  onChange={(event) => setComment(event.target.value)}
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
      ) : null}

      <div className="comment-list-wrapper">
        {/* comments in map */}
        {comments
          // ?.sort((a, b) => b - a)
          .reverse()
          .map((comment, i) => {
            return (
              <div key={i}>
                <div className="comment-list">
                  <div className="comment-list__avatar-container">
                    <img
                      className="comment-list__default-avatar"
                      src={comment.useravatar}
                      alt="useravatar"
                    ></img>
                  </div>
                  <div className="comment-list__info">
                    <div>{comment.name}</div>
                    <div>{moment(comment.timestamp).fromNow()}</div>
                  </div>
                </div>

                <div className="comment-list__description">
                  {comment.comment}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
