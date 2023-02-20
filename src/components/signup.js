import Navigation from "./navigation";
import "./components.css";
import Acorn from "../Images/acorn.png";
import globalVariables from "./globals/globalVariables";

export default function Signup() {
  return (
    <div>
      <Navigation />

      <div className="signuppage">
        <form className="signup_container">
          <h2 className="signupTitle">Sign Up</h2>

          <p className="forgot-password">
            Already registered <a href="/login"> Log in?</a>
          </p>

          <div className="row">
            <div className="usernamecontainer">
              <label>Username </label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
              />
            </div>

            <div className="usernamecontainer">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="radioDiv ">
            <p>Your AI Experience level:</p>
            <label for="f-option" class="l-radio">
              <input type="radio" id="f-option" name="selector" tabindex="1" />
              <span>Beginner</span>
            </label>
            <label for="s-option" class="l-radio">
              <input type="radio" id="s-option" name="selector" tabindex="2" />
              <span>Intermediate</span>
            </label>
            <label for="t-option" class="l-radio">
              <input type="radio" id="t-option" name="selector" tabindex="3" />
              <span>Expert</span>
            </label>
          </div>

          <div className="row">
            <div className="usernamecontainer">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="usernamecontainer">
              <label>Repeat Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="form__button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="mascotAcorn">
        <img src={Acorn} alt=""></img>
        <div className="AI-Bert-speech">
          <div className="box sb3 signupspeech">
            Sign up to access full AI-Bert functionality!
          </div>
        </div>
      </div>
    </div>
  );
}
