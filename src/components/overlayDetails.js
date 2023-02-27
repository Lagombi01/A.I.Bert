import React, { useState } from "react";
import cross from "../Images/cross.png";
import globalVariables from "./globals/globalVariables";
import { useEffect } from "react";
import "./components.css";
import bookmark from "../Images/smallBookmark.png";
import bookmarkFilled from "../Images/checkbox.png"
import book from "../Images/book.png";
import checkbox from "../Images/checkbox.png";

export default function Details() {
  
	const [isBookmarked, setIsBookmarked] = useState(false); // state to track whether the course is bookmarked
  const [isCompleted, setIsCompleted] = useState(false); // state to track whether the course is completed

	function updateBookmark() {
    const courseID = globalVariables.currentCourseID;
    
    fetch("http://localhost:5000/addbookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
			body: JSON.stringify({
        token: window.localStorage.getItem("token"),
				courseID,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setIsBookmarked(!isBookmarked);
    })
    .catch(error => console.error(error));
  }
 

	
  function updateCompletedCourses() {
    console.log(globalVariables.currentCourseID);
		setIsCompleted(!isCompleted);
  }

  function returnToAll() {
    globalVariables.currentCourseID = null;
    document.getElementsByClassName("overlayCourseSpan")[0].style.opacity = 0;
    document.getElementsByClassName("overlayCourseSpan")[0].style[
      "pointer-events"
    ] = "none";
    document.body.style["overflow"] = "auto";
  }

  document.addEventListener(
    "keydown",
    (event) => {
      var name = event.key;
      if (
        name == "Escape" &&
        document.getElementsByClassName("overlayCourseSpan")[0].style.opacity ==
          1
      ) {
        returnToAll();
      }
    },
    false
  );

  return (
    <div className="overlayCourseSpan">
      <div id="blackOverlay"></div>
      <div className="overlayCourseDetails">
        <div className="detailBlock">
          <div id="detailExit" onClick={returnToAll}>
            <img src={cross} />
          </div>
          <div className="courseImage">
            <img alt="Image"></img>
          </div>
          <div className="courseTitle">Title</div>
        </div>
        <div className="detailBlock">
          <div className="courseDescription">
            <p>Description</p>
            <p>
              <i></i>
            </p>
          </div>
          <div className="responseButtons">
            <a target="_blank">
              <div className="responseButton" id="openCourse">
                <img src={book} alt="Open Course" />
              </div>
            </a>
            <div className="responseButton" id="bookmark">
              <img src={isBookmarked ? bookmarkFilled : bookmark} onClick={updateBookmark} alt="Bookmark" />
            </div>
            <div className="responseButton" id="markComplete">
              <img src={checkbox} onClick={updateCompletedCourses} alt="Mark Complete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
