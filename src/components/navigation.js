import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import useLocation hook
import { NavLink } from "react-router-dom";
import './components.css';
import house from "../Images/house.png";
import courses from "../Images/open-book.png";
import tree from "../Images/tree.png";
import acorn from "../Images/acorn.png";
import squirrel from "../Images/squirrel.png";
import leaves from "../Images/falling-leaves.png";

import globalVariables from "./globals/globalVariables";
import fade from "./globals/elementFader";

export default function Navigation() {
  const navigate = useNavigate();

  function genericMiniAppear() {
    if (!globalVariables.mini && !globalVariables.home) {
        var elem = document.getElementsByClassName("miniMascot").item(0);
        var pos = '-78px';
        elem.style.setProperty('top',pos);
        var moveFunc = setInterval(function(){
            pos = String(parseInt(pos.slice(0,-2)) - 1) + 'px';
            elem.style.setProperty('top',pos);
            if (parseInt(pos.slice(0,-2)) < -85) {
                elem.style.setProperty('top','-85px');
                clearInterval(moveFunc);
                return;
            }
        }, 30)
        var mascotFadeFunc = setInterval(function() {fade(elem,0.1,[mascotFadeFunc])},30);
        globalVariables.mini = true;
    }
    globalVariables.home = false;
  }

  return (
    <div>
      <div class="bubbles home-bubbles">
        
          <div
            class="bubble flex-container"
            onClick={() => navigate("/bookmarks")}
          >
            <i class="fa colored-text">
              <img src={acorn} alt=""></img>
            </i>
            <p>Bookmarks</p>
          </div>
          <div
            class="bubble flex-container"
            onClick={() => navigate("/courses")}
          >
            <i class="fa colored-text">
              <img src={courses} alt=""></img>
            </i>
            <p>Courses</p>
          </div>
       

        <div class="bubble flex-container" onClick={() => navigate("/home")}>
          <i class="chatbotIcon">
            <img src={leaves} alt=""></img>
            <img src={squirrel} class="miniMascot" style={{opacity: globalVariables.mini?1:0}} onLoad={genericMiniAppear} alt=""></img>
          </i>
          <p className="title">AI-Bert</p>
        </div>

        <div class="bubble flex-container" onClick={() => navigate("/login")}>
          <i class="fa  colored-text">
            <img src={house} alt=""></img>
          </i>
          <p>Profile</p>
        </div>

        <div
          class="bubble flex-container"
          onClick={() => navigate("/learningjourney")}
        >
          <i class="fa colored-text">
            <img src={tree} alt=""></img>
          </i>
          <p>Learning Journeys</p>
        </div>
      </div>
    </div>
  );
}
