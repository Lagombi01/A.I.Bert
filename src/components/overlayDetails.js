import React, { useState } from "react";
import cross from "../Images/cross.png";
import globalVariables from "./globals/globalVariables";
import { useEffect } from "react";
import "./components.css";

import bookmark from "../Images/smallBookmark.png";
import bookmarkFilled from "../Images/filledSmallBookmark.png";
import checkbox from "../Images/checkbox.png";
import emptyCheckbox from "../Images/EmptyCheckbox.png"
import book from "../Images/book.png";

export default function Details() {
	const [startrefresh, setStartRefresh] = useState(false);
  const [bookmarkList, setBookmarklist] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(null); // state to track whether the course is bookmarked
  const [isCompleted, setIsCompleted] = useState(null); // state to track whether the course is completed

	useEffect(() => {
		fetch("http://localhost:5000/getbookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    }).then((response) => response.json())
		.then((data) => {
			setBookmarklist(data.data);
			console.log(data.data) });
	}, [startrefresh]);

    async function updateBookmark() {
		const courseID = globalVariables.currentCourseID
		let isBookmarked2 = await checkBookmark();
		// DELETE BOOKMARK IF ALREADY BOOKMARKED
		if (isBookmarked2){
			console.log("IS DELETING")
			console.log(courseID)
			fetch("http://localhost:5000/deletebookmark", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: window.localStorage.getItem("token"),
					courseID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data.bookmarks);
					setIsBookmarked(false);
				})
				.catch((error) => console.error(error));
		}
			else{
				console.log("IS ADDING")
				console.log(courseID)
			fetch("http://localhost:5000/addbookmark", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: window.localStorage.getItem("token"),
					courseID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data.bookmarks);
					setIsBookmarked(true);
				})
				.catch((error) => console.error(error));
		}

    }
   


    async function checkBookmark() {
        const response = await fetch("http://localhost:5000/getbookmarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        });
        const data = await response.json();
        setBookmarklist(data.data);
        console.log(data.data);
        const currentCourseID = globalVariables.currentCourseID.toString();
        const isBookmarked = data.data.includes(currentCourseID);
        console.log(`isBookmarked: ${isBookmarked}`);
        return isBookmarked;
    }

    async function checkComplete() {
    
        const response = await fetch("http://localhost:5000/getCompletedCourses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        });
        const data = await response.json();
        console.log(data.data);
        const currentCourseID = globalVariables.currentCourseID.toString();
        const isComplete = data.data.includes(currentCourseID);
        console.log(`isComplete: ${isComplete}`);
        return isComplete;
    }

    async function updateCompletedCourses() {
		const courseID = globalVariables.currentCourseID
		let isComplete2 = await checkComplete();
		console.log("the course is marked as complete:")
		console.log(isComplete2)
		if (isComplete2){
			console.log("IS DELETING")
			console.log(courseID)
			fetch("http://localhost:5000/deleteCompletedCourse", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: window.localStorage.getItem("token"),
					courseID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data.bookmarks);
					setIsCompleted(false);
				})
				.catch((error) => console.error(error));
		}
			else{
				console.log("IS ADDING")
				console.log(courseID)
			fetch("http://localhost:5000/addCompletedCourse", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: window.localStorage.getItem("token"),
					courseID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data.bookmarks);
					setIsCompleted(true);
				})
				.catch((error) => console.error(error));
		}

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
      if (name == "Escape" && document.getElementsByClassName("overlayCourseSpan")[0].style.opacity ==1) {
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
              <div>
                  <img
					className="bookmarkImage"
					src = {isBookmarked ? bookmarkFilled : bookmark}
                    onClick={updateBookmark}
                    alt="Bookmark"
                  />
              </div>
            </div>
            <div className="responseButton" id="markComplete">
              <img
				className="checkmarkImage"
                src={isCompleted ? checkbox : emptyCheckbox}
                onClick={updateCompletedCourses}
                alt="Mark Complete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
