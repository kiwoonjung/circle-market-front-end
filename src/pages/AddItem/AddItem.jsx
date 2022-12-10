import "./AddItem.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function AddItem() {
  return (
    <div>
      <Header />
      <form>
        <div className="addItem__img-container">
          <div className="addItem__img"></div>
        </div>
        <div className="addItem__btn-container">
          <button className="addItem__btn-upload">Upload Pictures</button>
        </div>
      </form>

      <form>
        <div className="addItem__title-container">
          <label className="addItem__title-label">
            Title
            <input className="addItem__title-input" type="text" />
          </label>
        </div>

        <div className="addItem__second-container">
          <div className="addItem__category-container">
            <label className="addItem__category-label">
              Category
              <select className="addItem__category-select" name="" id="">
                <option value="">Antiques</option>
                <option value="">Appliances</option>
                <option value="">Arts+crafts</option>
                <option value="">Atv & Utv & Snow</option>
                <option value="">Auto Parts</option>
                <option value="">Aviation</option>
                <option value="">Baby & Kid</option>
                <option value="">Barter</option>
                <option value="">Beauty & Health</option>
                <option value="">Bike Parts</option>
                <option value="">Bikes</option>
                <option value="">Boat Parts</option>
                <option value="">Boats</option>
                <option value="">Books</option>
                <option value="">Business</option>
                <option value="">Cars & Trucks</option>
                <option value="">Cds & Dvd & Vhs</option>
                <option value="">Cell Phones</option>
                <option value="">Clothes & Acc</option>
                <option value="">Collectibles</option>
                <option value="">Computer Parts</option>
                <option value="">Computers</option>
                <option value="">Electronics</option>
                <option value="">Farm & Garden</option>
                <option value="">Free</option>
                <option value="">Furniture</option>
                <option value="">Garage Sale</option>
                <option value="">General</option>
                <option value="">Heavy equip</option>
                <option value="">Household</option>
                <option value="">Jewelry</option>
                <option value="">Materials</option>
                <option value="">Motorcycle Parts</option>
                <option value="">Motorcycles</option>
                <option value="">Music & Instruments</option>
                <option value="">Photo & Video</option>
                <option value="">Rvs & Camp</option>
                <option value="">Sporting</option>
                <option value="">Tickets</option>
                <option value="">Tools</option>
                <option value="">Toys & Games</option>
                <option value="">Trailers</option>
                <option value="">Video Gaming</option>
                <option value="">Wanted</option>
                <option value="">Wheels & Tires</option>
              </select>
            </label>
          </div>

          <div className="addItem__price-container">
            <label className="addItem__price-label">
              Price
              <input className="addItem__price-input" type="text" />
            </label>
          </div>
        </div>

        <div className="addItem__description-container">
          <label>
            Description
            <textarea
              className="addItem__description-textarea"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </label>
        </div>

        <div className="addItem__btn-container">
          <button className="addItem__btn-post">POST</button>
        </div>
      </form>

      <Footer />
    </div>
  );
}
