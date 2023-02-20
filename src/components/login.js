import "./components.css";
import Navigation from "./navigation";
import Acorn from "../Images/acorn.png";

export default function Login() {
  return (
    <div>
      <Navigation />
      <div className="signuppage">
        <form className="signup_container">
          <h2 className="signupTitle">Log in</h2>

          <p className="forgot-password">
            Don't have an account?<a href="/signup"> Sign up </a>
          </p>

          <div className="logincontainer">
            <label>Username </label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
            />
          </div>

          <div className="logincontainer">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="form__button">
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="mascotAcorn">
        <img src={Acorn} alt=""></img>
        <div className="AI-Bert-speech">
          <div className="box sb3 signupspeech">
            Log in to experience full nutty functionality!
          </div>
        </div>
      </div>
    </div>
  );
}
