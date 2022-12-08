import "./ItemDetails.scss";
import like from "../../assets/images/icons/like.svg";
import comment from "../../assets/images/icons/comment.svg";
import view from "../../assets/images/icons/view.svg";
import Header from "../../components/Header/Header";
import AddComment from "../../components/AddComment/AddComment";
import CommentList from "../../components/CommentList/CommentList";
import Footer from "../../components/Footer/Footer";

export default function ItemDetails() {
  return (
    <div>
      <Header />
      <div className="itemDetails__img-container">
        <div className="itemDetails__img"></div>
      </div>

      <div className="user-wrapper">
        <div className="user-info">
          <div className="user-info__avatar-container">
            <div className="user-info__default-avatar"></div>
          </div>

          <div className="user-info__container">
            <div>
              <div>Domo</div>
              <div>Vancouver</div>
            </div>

            <div>
              <div>★★★★★</div>
              <div>Circle Lv 1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="title-container">
        <div>iPhone XR 256GB</div>
      </div>

      <div className="category-container">
        <div>Eletrics</div>
        <div>12-07-2022</div>
      </div>

      <div className="description-container">
        <div>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </div>
      </div>

      <div className="description__icon-container">
        <div className="description__icon-group">
          <img className="description__icon" src={like} alt="like.svg" />
          <div className="description__text">78</div>
        </div>

        <div className="description__icon-group">
          <img className="description__icon" src={comment} alt="comment.svg" />
          <div className="description__text">12</div>
        </div>

        <div className="description__icon-group">
          <img className="description__icon" src={view} alt="view.svg" />
          <div className="description__text">167</div>
        </div>
      </div>

      <AddComment />
      <CommentList />
      <Footer />
    </div>
  );
}
