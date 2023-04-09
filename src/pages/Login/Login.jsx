import "./Login.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    console.log(REACT_APP_API_URL);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      event.preventDefault();
      axios
        .post(`${REACT_APP_API_URL}/api/auth/signin`, {
          email: event.target.email.value,
          password: event.target.password.value,
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("jwt_token", response.data.accessToken);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <Header />
        <div>
          <div className="login-logo">Login</div>
          <div>
            <form className="login" onSubmit={handleSubmit}>
              <div className="login__input-container">
                <label className="login__label">
                  Useremail
                  <input
                    className="login__input-user"
                    type="email"
                    name="email"
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
            <Link to="/sign-up" className="mail__btn" type="button">
              Sign in with Email
            </Link>
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
            {err && <span>Something went wrong</span>}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
