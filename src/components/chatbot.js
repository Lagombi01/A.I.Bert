import squirrel from "../Images/squirrel.png";
<<<<<<< Updated upstream
=======
import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";
import Details from "./details";
import './components.css';

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
>>>>>>> Stashed changes

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
