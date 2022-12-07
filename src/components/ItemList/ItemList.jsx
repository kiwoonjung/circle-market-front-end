import "./ItemList.scss";
import iPhone from "../../assets/images/list/iPhoneXR-1.jpeg";

export default function ItemList() {
  return (
    <div>
      <div className="list-header">
        <h3>What's new on the list today</h3>
      </div>

      <div className="item">
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
      </div>
    </div>
  );
}
