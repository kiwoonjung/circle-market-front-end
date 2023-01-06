import "./CommentList.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultAvatar from "../../assets/images/icons/default_profile.svg";

export default function CommentList() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    await axios
      .get(`http://localhost:8080/api/post/findAllComments/${id}`)
      .then((response) => {
        setComments(response.data[0].comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getComments();
  }, [getComments()]);

  return (
    <div className="comment-list-wrapper">
      {/* comments in map */}
      {comments
        ?.sort((a, b) => b.timestamp - a.timestamp)
        .map((comments, i) => {
          return (
            <div key={i}>
              <div className="comment-list">
                <div className="comment-list__avatar-container">
                  <img
                    className="comment-list__default-avatar"
                    src={comments.useravatar}
                    alt="useravatar"
                  ></img>
                </div>
                <div className="comment-list__info">
                  <div>{comments.name}</div>
                  <div>{comments.timestamp}</div>
                </div>
              </div>

              <div className="comment-list__description">
                {comments.comment}
              </div>
            </div>
          );
        })}
    </div>
  );
}
