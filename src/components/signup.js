import Navigation from "./navigation";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./components.css";
import Acorn from "../Images/acorn.png";
import globalVariables from "./globals/globalVariables";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data, e) => {

  fetch("http://localhost:5000/register", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      email: data.email,
      experiencelvl: data.xp,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error));
};

  return (
    <div>
      <Navigation />

      <div className="signuppage">
        <form
          className="signup_container"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h2 className="signupTitle">Sign Up</h2>

          <p className="forgot-password">
            Already registered <a onClick={() => {navigate("/Login")}}> Log in?</a>
          </p>

          <div className="row">
            <div className="usernamecontainer">
              <label>Username </label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                {...register("username")}
              />
            </div>

            <div className="usernamecontainer">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>
          </div>

          <div className="radioDiv ">
            <p>Your AI Experience level:</p>
            <label for="f-option" class="l-radio">
              <input
                type="radio"
                id="f-option"
                value="1"
                name="selector"
                tabindex="1"
                {...register("xp")}
              />
              <span>Beginner</span>
            </label>
            <label for="s-option" class="l-radio">
              <input
                type="radio"
                id="s-option"
                value="2"
                name="selector"
                tabindex="2"
                {...register("xp")}
              />
              <span>Intermediate</span>
            </label>
            <label for="t-option" class="l-radio">
              <input
                type="radio"
                id="t-option"
                value="3"
                name="selector"
                tabindex="3"
                {...register("xp")}
              />
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
                {...register("password")}
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
