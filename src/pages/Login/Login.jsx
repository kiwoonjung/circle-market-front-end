import "./Login.scss";
import Header from "../../components/Header/Header";

export default function Login() {
  return (
    <div>
      <Header />
      <div>
        <div className="login-logo">Login</div>
        <div>
          <form className="login">
            <div className="login__input-container">
              <label className="login__label">
                Username
                <input
                  className="login__input-user"
                  type="text"
                  name="username"
                />
              </label>
            </div>

            <div className="login__input-container">
              <label className="login__label">
                Password
                <input
                  className="login__input-pw"
                  type="password"
                  name="password"
                />
              </label>
            </div>

            <div className="login__forgot">Forgot Password?</div>
            <div className="login__btn-container">
              <button className="login__btn" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>

        <div className="or">OR</div>

        <div className="mail">
          <button className="mail__btn" type="button">
            Sign in with Email
          </button>
        </div>

        <div className="google">
          <button className="google__btn" type="button">
            Sign in with Google
          </button>
        </div>

        <div className="facebook">
          <button className="facebook__btn" type="button">
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
