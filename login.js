// import CSS file and components
import "./components.css";
import Navigation from "./navigation";
import React, { useState } from "react"; // import useState
import Acorn from "../Images/acorn.png";
import { useForm } from "react-hook-form";

// define the Login component
export default function Login() {
  // initialize state variables and hooks
  const { register, handleSubmit } = useForm(); // react-hook-form
  const [errorMessage, setErrorMessage] = useState(""); // add state variable for error message

  // define onSubmit function for handling form submission
  const onSubmit = (data, e) => {
    console.log(data); // log form data
    // make a POST request to the login endpoint with form data
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
      .then((response) => response.json()) // convert response to JSON
      .then((data) => {
        console.log(data); // log response data
        if (data.status == "ok") {
          // if login is successful, set token and login status in localStorage
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/profile"; // redirect to profile page
          alert("login successful"); // show login success message
        } else {
          // if login is unsuccessful, set error message in state
          setErrorMessage("Invalid Username or Password");
        }
      })
      .catch((error) => console.error(error)); // log any errors
  };

  // return the Login component
  return (
    <div>
      <Navigation /> 
      <div className="signuppage">
        <form className="signup_container" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="signupTitle">Log in</h2>

          <p className="sign-up">
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

          <p className="forgotPassword">
            Forgotten your password?{" "}
            <a href="/forgotPassword"> Forgot Password</a>
          </p>

          <div className="d-grid">
            <button type="submit" className="form__button">
              Log in
            </button>
          </div>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )} {/* conditionally render error message */}
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
