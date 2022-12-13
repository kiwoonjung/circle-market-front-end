import "./AddComment.scss";

export default function AddComment() {
  return (
    <div>
      <form className="comment">
        <div className="comment__container">
          <div className="comment__avatar-container">
            <div className="comment__default-avatar"></div>
          </div>
          <label className="comment__label">
            Comment
            <textarea className="comment__input" type="text" />
          </label>
        </div>

        <div className="comment__btn-container">
          <button className="comment__btn-comment">Add Comment</button>
        </div>
      </form>
    </div>
  );
}
