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

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div>
      <div class="bubbles home-bubbles">
        
          <div
            class="bubble flex-container"
            onClick={() => navigate("/bookmarks")}
          >
            <i class="fa fa-github colored-text">
              <img src={acorn} alt=""></img>
            </i>
            <p>BookMarks</p>
          </div>
 

       
          <div
            class="bubble flex-container"
            onClick={() => navigate("/courses")}
          >
            <i class="fa fa-github colored-text">
              <img src={courses} alt=""></img>
            </i>
            <p>Courses</p>
          </div>
       

        <div class="bubble flex-container" onClick={() => navigate("/home")}>
          <i class="chatbotIcon">
            <img src={leaves} alt=""></img>
          </i>
          <p className="title">AI-Bert</p>
        </div>

        <div class="bubble flex-container" onClick={() => navigate("/profile")}>
          <i class="fa fa-google-plus colored-text">
            <img src={house} alt=""></img>
          </i>
          <p>Profile</p>
        </div>

        <div
          class="bubble flex-container"
          onClick={() => navigate("/learningjourney")}
        >
          <i class="fa fa-whatsapp colored-text">
            <img src={tree} alt=""></img>
          </i>
          <p>Learning Journeys</p>
        </div>
      </div>
    </div>
  );
}
