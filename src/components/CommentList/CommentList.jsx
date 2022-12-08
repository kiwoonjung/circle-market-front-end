import "./CommentList.scss";

export default function CommentList() {
  return (
    <div className="comment-list-wrapper">
      <div className="comment-list">
        <div className="comment-list__avatar-container">
          <div className="comment-list__default-avatar"></div>
        </div>
        <div className="comment-list__info">
          <div>Neo</div>
          <div>12-07-2022</div>
        </div>
      </div>

      <div className="comment-list__description">
        They BLEW the ROOF off at their last event, once everyone started
        figuring out they were going. This is still simply the greatest opening
        of an event I have EVER witnessed.
      </div>
    </div>
  );
}
