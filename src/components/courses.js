import { courseData } from "./../courseData.js";
import Navigation from './navigation';
import './components.css';

export default function Courses() {
    return (
    <div>
        <Navigation />
        <h1>List of Courses</h1>
        <div id = "wrapperStyle">
            {courseData.map((data, key) => {
                return (
                    <div key={key} id = "cardStyle">
                        <div><img src={data.image} id = "courseImage"/></div>
                        <div><strong>{data.name}</strong></div>
                        <div id = "descriptionStyle">{data.description}</div>
                        <div><a href ={data.link} target="_blank"><button type="button">Learn More</button></a> </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}
