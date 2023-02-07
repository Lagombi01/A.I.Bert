import skillsbuild from "../Images/skillsbuild.png";
import mindspark from "../Images/mindspark.png";
import developer from "../Images/developer.png";

export default function details() {
  return (
        <div className="courseSpan">
            <div className="courseDetails">
                <div className="courseImage">
                    <img src={developer} alt=""></img>
                </div>
                <div className="courseTitle">
                    Implement trustworthy AI and data governance on AWS using IBM Cloud Pak for Data
                </div>
                <div className="courseDescription">
                    <p>An online webinar designed primarily for teachers. Examine your own tech experience as you explore the roles of gender, race, and bias in technology and STEM fields. Gain the resources needed to make your students aware of how AI affects them, and join the fight against algorithmic bias and injustice.</p>
                    <p><i>Length: 3 hours</i></p>
                </div>
            </div>
        </div>
  );
}
