import Navigation from "./navigation";
import React from "react";
import "./components.css";
import Acorn from "../Images/acorn.png";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
    const { register, handleSubmit } = useForm();
    const onError = (errors, e) => console.log(errors, e);

    const onSubmit = (data, e) => {

        fetch("http://localhost:5000/forgotPassword",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email: data.email
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
            <div className="forgotPasswordPage">
                <h2 className="forgotPasswordTitle">Forgot Password</h2>
                <form className="forgotPasswordForm" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="forgotPasswordInput">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className = "form-control"
                            placeholder="Enter your email address"
                            {...register("email")}
                        />
                    </div>
                    <button type="submit" className="forgotPasswordButton">Reset Password</button>
                </form>
            </div>
            <div className="mascotAcorn">
                <img src={Acorn} alt="" />
                <div className="AI-bert-speech">
                    <div className="box sb3 signupspeech">
                        Forgot your password? No worries! Get it reset here *squeak*
                    </div>
                </div>
            </div>
        </div>
    );
}
