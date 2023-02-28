import Navigation from "./navigation";
import "./components.css";
import User from "../Images/user.png";
import { useState, useEffect } from "react";
import { courseData } from "./../courseData.js";
import { Link } from "react-scroll";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [bookmarklist, setBookmarklist] = useState(null);

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
        console.log(userData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  function renderitem(data) {
    console.log(data);
    console.log(courseData);
    for (let i = 0; i < courseData.length; i++) {
      if (courseData[i].id === data) {
        console.log(courseData[i]);
        return (
          <a href={courseData[i].link}>
            <div className="bookmarkItem">
              <img classname="bookmarkImage" src={courseData[i].image}></img>
              <p>{courseData[i].name}</p>
            </div>
          </a>
        );
      }
    }
  }

  return (
    <div>
      <Navigation />
      <div className="Profile">
        <div className="profile_container">
          <div className="profile_details">
            <div className="column1">
              <img src={User} className="userimage" alt=""></img>
            </div>
            <div className="column2">
              {userData && <h3>Welcome {userData.data.username} !</h3>}

              {userData && userData.data.email && (
                <h3>{userData.data.email}</h3>
              )}
              {userData && userData.data.experiencelvl && (
                <h5>{userData.data.experiencelvl}</h5>
              )}
            </div>
          </div>

          <div className="completion">
            <h4> Your Progress </h4>
            <h2>55%</h2>
          </div>
          <div className="completion">
            <Link
              className="form__button completebutton"
              to="completed"
              smooth={true}
              duration={500}
            >
             View Completed Courses
            </Link>
            <button class="form__button logoutbutton" onClick={handleLogout}>
              Log Out
            </button>
            <button class="form__button deletebutton" onClick={handleLogout}>
              Delete Profile
            </button>
          </div>
        </div>
        <div className="course_display">
          <div className="bookmarked_courses" id="bookmarks">
            <div>
              <h3 className="bookmarktitle">Bookmarked Courses</h3>
            </div>

            <div className="course_list">
              {userData &&
                userData.data.bookmarks &&
                userData.data.bookmarks.map((data, index) => {
                  return <div className="course-card">{renderitem(data)}</div>;
                })}
            </div>
          </div>
          <div className="completed_courses" id="completed">
            <h4>Completed Courses</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
