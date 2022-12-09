import squirrel from "../Images/squirrel.png";

export default function chatbot() {
  return (
    <div className="chatbot flex-container">
      <div className="mascot">
        <img src={squirrel} alt=""></img>
      </div>
      <div className="input-output-fields">
        <div className="AI-Bert-speech">
          <div className="box sb3">
            Hi! I'm AI-Bert, I am here to assist you with your learning in AI!
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
