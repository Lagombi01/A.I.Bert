import Navigation from "./navigation";
import "./components.css";
import User from "../Images/user.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


export default function Profile() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href="/login"
    
  };

  return (
    <div>
      <Navigation />
      <div className="profile_container">
        <div className="profile_details">
        <img src={User} alt=""></img>
        {userData && <h4>Welcome {userData.data.username} !</h4>}
        {userData && userData.data.email && (
          <p>{userData.data.email}</p>
        )}
        {userData && userData.data.experiencelvl && (
          <p>{userData.data.experiencelvl}</p>
        )}
        
        {userData && userData.data.experiencelvl === 3 && <p>Expert</p>}
        {userData && userData.data.experiencelvl === 2 && <p>Intermediate</p>}
        {userData && userData.data.experiencelvl === 1 && <p>Beginner</p>}
        <button onClick={handleLogout}>Log out</button>
      </div>
     
      </div>
    </div>
  );
}
