import Navigation from "./navigation";
import { useNavigate } from "react-router-dom";
import "./components.css";
import { useEffect } from "react";

export default function CreateLearningJourney() {

    const navigate = useNavigate();

    async function postLearningJourney(courseIDs) {
        await fetch("http://localhost:5000/addLearningJourney", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                courseIDs,
            }),
        })
            .then((response) => response.json())
            .then(navigate("/LearningJourney"))
            .catch((error) => console.error(error));
    }

  return (
    <div>
      <Navigation />
      <h1>Create Learning Journey</h1>
      <button type="button" onClick={() => {postLearningJourney("101301401Example Learning Journey")}}>Click to generate example</button>
    </div>
  );
}
