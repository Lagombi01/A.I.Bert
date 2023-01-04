import squirrel from "../Images/squirrel.png";
import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";
import Details from "./details.js";

export default function chatbot() {
  return (
    <div className="chatbot flex-container">
      <div className="mascot">
        <img src={squirrel} alt=""></img>
      </div>
        <Details />
        <div className="responseButtons">
            <div className="responseButton" id="openCourse">Open Course</div>
            <div className="responseButton" id="notRelevant">Not Relevant</div>
            <div className="responseButton" id="tooEasy">Too Easy</div>
            <div className="responseButton" id="tooHard">Too Hard</div>
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
        <div className="userInput">
          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="What would you like to learn?"
              name="input"
              id="input"
              required
            />
            <label for="name" class="form__label">
            What would you like to learn?
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
