import Navigation from "./navigation";
import "./components.css";
import User from "../Images/user.png";
import { useState, useEffect } from "react";
import { courseData } from "./../courseData.js";
import { Link } from "react-scroll";
import { set } from "lodash";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [progressPercent, setprogressPercent] = useState(0);
  const [listlength, setListlength] = useState(0);

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
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  function renderPercentage() {
    console.log(userData);

    if (userData && userData.data.completedCourses) {
      const percentage =  Math.round((userData.data.completedCourses.length / 27) * 100);
      console.log(percentage);
      return (
        <div>
          <div class="single-chart">
            <svg viewBox="0 0 36 36" class="circular-chart orange">
              <path
                class="circle-bg"
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="circle"
                stroke-dasharray={`${percentage}, 100`}
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" class="percentage">
              {percentage}%
              </text>
            </svg>
          </div>
        </div>
      );
    }
  }

  function renderBookmarkitem(data) {
    for (let i = 0; i < courseData.length; i++) {
      if (courseData[i].id === data) {
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

  function renderCourseitem(data) {
    for (let i = 0; i < courseData.length; i++) {
      if (courseData[i].id === data) {
        return (
          <a href={courseData[i].link}>
            <div className="completedItem">
              <img classname="courseImage" src={courseData[i].image}></img>
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
                <h5>{userData.data.email}</h5>
              )}
              {userData && userData.data.experiencelvl && (
                <h5>{userData.data.experiencelvl}</h5>
              )}
            </div>
          </div>

          <div className="completion">
            <p>Courses completed</p>
            <div>{renderPercentage()}</div>
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
                  return (
                    <div className="course-card">
                      {renderBookmarkitem(data)}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="completed_courses" id="completed">
            <div>
              <h3 className="bookmarktitle">Completed Courses</h3>
            </div>
            <div className="course_list">
              {userData &&
                userData.data.completedCourses &&
                userData.data.completedCourses.map((data, index) => {
                  return (
                    <div className="course-card">{renderCourseitem(data)}</div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
