import Navigation from "./navigation";
import "./components.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Details from "./overlayDetails.js";
import fillDetails from "./globals/detailsFiller";
import globalVariables from './globals/globalVariables.js';
import CheckBookmark from './globals/checkBookmark.js';
import CheckComplete from './globals/checkComplete';

import CompletedSkillsbuild from '../Images/completedSkillsbuild.png';
import CompletedMindspark from '../Images/completedMindspark.png';
import CompletedDeveloper from '../Images/completedDeveloper.png';

import filledBookmark from '../Images/filledSmallBookmark.png'
import Bookmark from '../Images/smallBookmark.png'
import Checkbox from '../Images/checkbox.png';
import emptyCheckbox from '../Images/EmptyCheckbox.png';
import { courseData } from "../courseData";

export default function LearningJourney() {

    const navigate = useNavigate();

    useEffect(() => {
        loadLearningJourneys();
    }, []);

  async function loadLearningJourneys() {
    var journeys = await getLearningJourneys().then(data => data);
    for (var i = 0; i < journeys.length; i++) {
        if (document.getElementById(journeys[i].substring(9)) == null) await buildJourney(journeys[i]);
    }
    //marginAdjust();
    document.getElementsByClassName("learningJourneyButtons")[0].className = "learningJourneyButtons fade_animation";
    document.getElementsByClassName("learningJourneyButtons")[0].style.opacity = 1;
  }

  async function buildJourney(journey) {
    var journeyDiv = document.createElement("div");
    journeyDiv.className = "learningJourney fade_animation";

    var canvasDiv = document.createElement("div");
    canvasDiv.className = "canvas";
    journeyDiv.appendChild(canvasDiv);

    var coursesDiv = document.createElement("div");
    coursesDiv.className = "treeCourses";

    var completed = [];
    globalVariables.currentCourseID = journey.substring(0,3);
    completed.push(await CheckComplete().then(bool => bool));
    globalVariables.currentCourseID = journey.substring(3,6);
    completed.push(await CheckComplete().then(bool => bool));
    globalVariables.currentCourseID = journey.substring(6,9);
    completed.push(await CheckComplete().then(bool => bool));

    for (var i = 0; i < 9; i += 3) {

        var courseDiv = document.createElement("div");
        courseDiv.id = journey.substring(i,i+3);
        courseDiv.className = "treeCardStyle";

        var course = courseData.find(item => item.id === journey.substring(i,i+3));

        courseDiv.onclick = (e) => {showDetails(e)};

        var imgDiv = document.createElement("div");
        
        var img = document.createElement("img");
        if (completed[i/3]) {
            switch (journey[i]) {
                case "1":
                    img.setAttribute("src",CompletedSkillsbuild);
                    break;
                case "3":
                    img.setAttribute("src",CompletedMindspark);
                    break;
                case "4":
                    img.setAttribute("src",CompletedDeveloper);
                    break;
            }
        } else img.setAttribute("src",course.image);
        img.className = "courseThumb";
        img.alt = "Course thumbnail";
        imgDiv.appendChild(img);

        var titleDiv = document.createElement("div");

        var strong = document.createElement("strong");
        strong.innerHTML = course.name;
        titleDiv.appendChild(strong);

        courseDiv.appendChild(imgDiv);
        courseDiv.appendChild(titleDiv);

        coursesDiv.appendChild(courseDiv);
    }

    canvasDiv.appendChild(coursesDiv);

    var treeDiv = document.createElement("div");
    treeDiv.className = "tree";

    var trunkDiv = document.createElement("div");
    trunkDiv.className = "trunk";

    var leaves = [5,5,5,4,4,4,2,3];

    for (var i = 0; i < leaves.length; i++) {
        var branchDiv = document.createElement("div");
        branchDiv.className = "branch";
        for (var j = 0; j < leaves[i]; j++) {
            var leafDiv = document.createElement("div");
            leafDiv.className = "leaf";
            branchDiv.appendChild(leafDiv);
        }
        trunkDiv.appendChild(branchDiv);
    }

    treeDiv.appendChild(trunkDiv);
    canvasDiv.appendChild(treeDiv);

    var notCanvasDiv = document.createElement("div");
    notCanvasDiv.className = "notCanvas";

    var h2 = document.createElement("h2");
    h2.innerHTML = journey.substring(9);
    notCanvasDiv.appendChild(h2);

    var finished = (completed[0] && completed[1] && completed[2])

    var h3 = document.createElement("h3");
    h3.innerHTML = finished?"Completed":"Incomplete";
    if (finished) h3.style["background-color"] = "#53ad71";
    notCanvasDiv.appendChild(h3);

    var h4 = document.createElement("h4");
    h4.innerHTML = "Delete";
    h4.id = journey;
    h4.onclick = (e) => {deleteLearningJourney(e)};
    notCanvasDiv.appendChild(h4);

    journeyDiv.appendChild(notCanvasDiv);
    journeyDiv.id = journey.substring(9);

    document.getElementsByClassName("learningJourneyPage")[0].insertBefore(journeyDiv,document.getElementsByClassName("learningJourneyButtons")[0])

  }

  function marginAdjust() {
    for (var i = 0; i < document.getElementsByClassName("treeCourses").length; i++) {
        var cssObj = window.getComputedStyle(document.getElementsByClassName("treeCourses")[i],null);
        document.getElementsByClassName("treeCourses")[i].style["margin-top"] = parseFloat(150.0 - parseInt(cssObj.getPropertyValue("height"))/2.0) + "px";
    }
  }

  async function showDetails (event) {
    var id = event.currentTarget.id;
    globalVariables.currentCourseID = id;
    fillDetails(id);
    document.getElementsByClassName("overlayCourseSpan")[0].style.opacity = 1;
    document.getElementsByClassName("overlayCourseSpan")[0].style["pointer-events"] = "auto";

    let isBookmarked = await CheckBookmark()
    let bookmarkImage = document.getElementsByClassName("bookmarkImage")[0];
    if (isBookmarked == true){
        bookmarkImage.setAttribute("src", filledBookmark);
    } else {
        bookmarkImage.setAttribute("src", Bookmark);
    }
    let isComplete = await CheckComplete()
    let CheckmarkImage = document.getElementsByClassName("checkmarkImage")[0];
    if (isComplete == true){
        CheckmarkImage.setAttribute("src",  Checkbox);
    } else {
        CheckmarkImage.setAttribute("src", emptyCheckbox);
    }
    
    document.body.style["overflow"] = "hidden";
}

async function getLearningJourneys() {
    const response = await fetch("http://localhost:5000/getLearningJourneys", {
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
    return data.data;
}

async function deleteLearningJourney(event) {
    var courseIDs = event.currentTarget.id;
    await fetch("http://localhost:5000/deleteLearningJourney", {
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
        .then(event.currentTarget.parentElement.parentElement.remove())
        .catch((error) => console.error(error));
}

  return (
    <div className="learningJourneyPage">
      <Navigation />
      
      <div className="learningJourneyButtons">
        <div className="learningJourneyButton" onClick={() => navigate("/CreateLearningJourney")}>
            Create Learning Journey
        </div>
      </div>

      <Details />
    </div>
  );
}
