import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";
import cross from "../Images/cross.png";
import globalVariables from "./globals/globalVariables";
import { useEffect } from 'react';
import './components.css';
import bookmark from "../Images/smallBookmark.png";
import book from "../Images/book.png";
import checkbox from "../Images/checkbox.png";

export default function Details() {

    function returnToAll() {
        globalVariables.currentCourseID = null;
        document.getElementsByClassName("overlayCourseSpan")[0].style.opacity = 0;
        document.getElementsByClassName("overlayCourseSpan")[0].style["pointer-events"] = "none";
        document.body.style["overflow"] = "auto";
    }

    document.addEventListener('keydown', (event) => {
        var name = event.key;
        if (name == "Escape" && document.getElementsByClassName("overlayCourseSpan")[0].style.opacity == 1) {
            returnToAll();
        }
    },false);

    return (
        <div className="overlayCourseSpan">
            <div id="blackOverlay"></div>
            <div className="overlayCourseDetails">
                <div className="detailBlock">
                    <div id="detailExit" onClick={returnToAll}>
                        <img src={cross}/>
                    </div>
                    <div className="courseImage">
                        <img alt="Image"></img>
                    </div>
                    <div className="courseTitle">
                        Title
                    </div>
                </div>
                <div className="detailBlock">
                    <div className="courseDescription">
                        <p>Description</p>
                        <p><i></i></p>
                    </div>
                    <div className="responseButtons">
                        <a target="_blank"><div className="responseButton" id="openCourse"><img src={book} alt="Open Course"/></div></a>
                        <div className="responseButton" id="bookmark"><img src={bookmark} alt="Bookmark"/></div>
                        <div className="responseButton" id="markComplete"><img src={checkbox} alt="Mark Complete"/></div>
                    </div>
                </div>
            </div>
        </div>
  );
}
