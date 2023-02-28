import Navigation from "./navigation";
import React from "react";
import "./components.css";
import Acorn from "../Images/acorn.png";
import globalVariables from "./globals/globalVariables";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data, e) => {

    if (data.password !== data.repeatPassword) {                  //ensuring the password and repeated password match
      alert("Passwords do not match.");
      return;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // if (!emailRegex.test(data.email)){                            //ensuring the inputted email is of a valid format
    //   alert("Please enter a valid email address");
    //   return;
    // }


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
      repeatPassword: data.repeatPassword,
      email: data.email,
      experiencelvl: data.xp,
    }),
  })
  .then((response => {
    if(!response.ok) {
      throw new Error("Username or password already exists");
    }
    return response.json();
  }))
  .then((data) => {
    //inform user of their succesful registration and redirect to login page
    alert("Registration Succesful!");
    window.location.href = "/login";
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

          <p className="already-registered">
            Already registered <a href="/login"> Log in?</a>
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
                {...register("username")}
              />
            </div>
          </div>
        {/* THIS FUNCTIONALITY DOESN'T APPEAR TO WORK ON MY MACHINE, TRIED ADDING SOME CSS TO THE APP.CSS TO FIX IT BUT IT DIDNT WORK. */}
          <div className="radioDiv ">               
            <p>Your AI Experience level:</p>
            <label for="f-option" class="l-radio">
              <input
                type="radio"
                id="f-option"
                value="Beginner"
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
                value="Intermediate"
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
                value="Advanced"
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
                placeholder="Repeat password"
                {...register("repeatPassword")}
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
