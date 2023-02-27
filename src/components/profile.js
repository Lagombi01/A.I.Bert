import Navigation from "./navigation";
import "./components.css";
import User from "../Images/user.png";
import { useState, useEffect } from "react";
import { courseData } from "./../courseData.js";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [bookmarklist, setBookmarklist] = useState(null);

  useEffect(() => {
    console.log(courseData)
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
        console.log(userData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  const getCoursebyId =() =>{
    
  }

  return (
    <div>
      <Navigation />
      <div className="profile_container">
        
        <div className="profile_details">
          <div className="column1">
            <img src={User} className="userimage" alt=""></img>

            <button class="form__button" onClick={handleLogout}>
            Log out
          </button>
          </div>
          <div className="column2">
            {userData && <h4>Welcome {userData.data.username} !</h4>}

            {userData && userData.data.email && <h5>{userData.data.email}</h5>}
            {userData && userData.data.experiencelvl && (
              <h5>{userData.data.experiencelvl}</h5>
            )}
          </div>
        </div>

        <div className="completion">
          <h4> Progress </h4>
          <h1>55%</h1>
        </div>

      </div>
      <div className="course_display">
          <div className="completed_courses">
            <h4>Completed Courses</h4>
          </div>

          <div className="bookmarked_courses">
            <div>
              <h4>Bookmarked Courses</h4>
            </div>

            <div className="course_list">
              {userData && userData.data.bookmarks && (
                <p>
                  {" "}
                  {userData.data.bookmarks.map((data, index) => {
                    return (
                      <p key={index} className="">
                        {data}
                      </p>
                    );
                  })}{" "}
                </p>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
