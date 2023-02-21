import "./components.css";
import Navigation from "./navigation";
import React from "react";
import Acorn from "../Images/acorn.png";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data, e) => {
    console.log(data);
    fetch("http://localhost:5000/login", {
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);


          window.location.href="/profile"
          alert("login successful");
        }
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
              {...register("username")}
            />
          </div>

          <div className="logincontainer">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password")}
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
