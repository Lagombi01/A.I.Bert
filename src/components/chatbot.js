import squirrel from "../Images/squirrel.png";
import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";

export default function chatbot() {
  return (
    <div className="chatbot flex-container">
      <div className="mascot">
        <img src={squirrel} alt=""></img>
      </div>
        <div className="courseSpan">
            <div className="courseDetails">
                <div className="courseImage">
                    <img src={developer} alt=""></img>
                </div>
                <div className="courseTitle">
                    Implement trustworthy AI and data governance on AWS using IBM Cloud Pak for Data
                </div>
                <div className="courseDescription">
                    An online webinar designed primarily for teachers. Examine your own tech experience as you explore the roles of gender, race, and bias in technology and STEM fields. Gain the resources needed to make your students aware of how AI affects them, and join the fight against algorithmic bias and injustice.
                </div>
            </div>
        </div>
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
            Here's a course I found:
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
