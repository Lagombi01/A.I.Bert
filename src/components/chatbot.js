import { useState, useEffect } from "react";
import squirrel from "../Images/squirrel.png";
import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";
import Details from "./details";
import bookmark from "../Images/bookmark.png";

export default function Chatbot() {

  //handles user message
  const [message, setMessage] = useState("");
  const [session, setSession] = useState("");

  //Function handles user submission and sends to watson API for response back
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      console.log(message);
      setMessage("");
    }

    fetch('http://localhost:5000/api/watson/message', {
      method: 'POST',
      headers:{ "Content-Type": "application/json", "session_id": `${session}`,},
      body: JSON.stringify({
        input: `${message}`,
      })
    }).then(() =>{
      console.log('sucess');
    }).catch(err => {
    });
  };

  //set up watson assistant session with external API
  useEffect(() => {
    fetch("http://localhost:5000/api/watson/session")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSession(data.session_id);
        console.log(session)
      });
  }, []);

  return (
    <div className="chatbot flex-container">
      <div className="mascot">
        <img src={squirrel} alt=""></img>
      </div>
      <Details/>
        <div className="responseButtons">
            <div className="responseButton" id="openCourse">Open Course</div>
            <div className="responseButton" id="notRelevant">Not Relevant</div>
            <div className="responseButton" id="tooEasy">Too Easy</div>
            <div className="responseButton" id="tooHard">Too Hard</div>
            <div className="responseButton" id="bookmark"><img src={bookmark} alt="Bookmark"/></div>
        </div>
      <div className="input-output-fields">
      
        <div className="AI-Bert-speech">
          <div className="box sb3">
            Hi! I'm AI-Bert, I am here to assist you with your learning in AI!
          </div>
          <div className="topbox sb4">
            <div>Here's a course I found:</div>
          </div>
        </div>

        {/* Input goes here */}
        <div className="userInput">
          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="What would you like to learn?"
              name="input"
              id="input"
              required
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleClick}
              value={message}
            />
            <label for="name" class="form__label">
              What would you like to learn?
            </label>
            <p>Session ID: <br></br>{session}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
