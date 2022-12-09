import "./Test.scss";

export default function Test() {
  return (
    <div className="mobile-wrapper">
      <div className="mobile-container">
        <div className="content">
          <nav className="header-nav">
            <input className="header-input" type="checkbox" id="hamburger1" />
            <label className="header-label" htmlfor="" for="hamburger1"></label>

            <ul className="nav-links">
              <li className="nav-li">
                <a className="nav-a" href="#">
                  about us
                </a>
              </li>
              <li className="nav-li">
                <a className="nav-a" href="#">
                  products
                </a>
              </li>
              <li className="nav-li">
                <a className="nav-a" href="#">
                  media
                </a>
              </li>
              <li className="nav-li">
                <a className="nav-a" href="#">
                  contact us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
