import "./Footer.scss";
import facebook from "../../assets/images/icons/facebook.svg";
import instagram from "../../assets/images/icons/instagram.svg";
import twitter from "../../assets/images/icons/twitter.svg";

export default function Footer() {
  return (
    <div>
      <div className="footer__logo">
        <div>
          <img src={facebook} alt="facebook-logo" />
        </div>
        <div>
          <img src={instagram} alt="instagram-logo" />
        </div>

        <div>
          <img src={twitter} alt="twitter-logo" />
        </div>
      </div>

      <div>
        <div className="footer__text">Info • Support • Marketing</div>
      </div>

      <div>
        <div className="footer__text">Terms of Use • Privacy Policy</div>
      </div>

      <div>
        <div className="footer__copyright">© 2022 Circle Market</div>
      </div>
    </div>
  );
}
