import "./SignUp.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function SignUp() {
  return (
    <div>
      <Header />
      <div>
        <div className="signup-logo">Sign Up</div>
        <div>
          <form className="signup">
            <div className="signup__input-container">
              <label className="signup__label">
                Email
                <input
                  className="signup__input-email"
                  type="text"
                  name="username"
                />
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Username
                <input
                  className="signup__input-user"
                  type="text"
                  name="username"
                />
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Password
                <input
                  className="signup__input-pw"
                  type="password"
                  name="password"
                />
              </label>
            </div>

            <div className="signup__input-container">
              <label className="signup__label">
                Confirm Password
                <input
                  className="signup__input-confirm-pw"
                  type="password"
                  name="confirm-password"
                />
              </label>
            </div>

            <div className="signup__btn-container">
              <button className="signup__btn" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
