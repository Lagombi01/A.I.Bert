import { courseData } from "./../courseData.js";
import Navigation from './navigation';
<<<<<<< Updated upstream

const wrapperStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    columnGap: "10px",
    rowGap: "1em"
};

const cardStyle = {
    backgroundColor: "dodgerblue",
    color: "white",
    padding: "1rem",
    height: "fit-content"
};

const descriptionStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

<<<<<<< HEAD
export default function courses(){
    return(
        <div>
            <Navigation />
            <h1>List of Courses</h1>
            
=======
import './components.css';
=======
const courseImage = {width: "100%"};
>>>>>>> main

export default function Courses() {
    return (
    <div>
        <Navigation />
        <h1>List of Courses</h1>
<<<<<<< HEAD
        <div id = "wrapperStyle">
            {courseData.map((data, key) => {
                return (
                    <div key={key} id = "cardStyle">
                        <div><img src={data.image} id = "courseImage"/></div>
                        <div><strong>{data.name}</strong></div>
                        <div id = "descriptionStyle">{data.description}</div>
=======
        <div style={wrapperStyle}>
            {courseData.map((data, key) => {
                return (
                    <div key={key} style = {cardStyle}>
                        <div><img src={data.image} style={courseImage}/></div>
                        <div><strong>{data.name}</strong></div>
                        <div style={descriptionStyle}>{data.description}</div>
>>>>>>> main
                        <div><a href ={data.link} target="_blank"><button type="button">Learn More</button></a> </div>
                    </div>
                );
            })}
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> main
        </div>
    </div>
    )
}
