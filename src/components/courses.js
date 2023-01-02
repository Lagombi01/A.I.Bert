import { courseData } from "./../courseData";
import Navigation from './navigation';

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

const courseImage = {width: "100%"};

export default function courses() {
    return (
    <div>
        <Navigation />
        <h1>List of Courses</h1>
        <div style={wrapperStyle}>
            {courseData.map((data, key) => {
                return (
                    <div key={key} style = {cardStyle}>
                        <div><img src={data.image} style={courseImage}/></div>
                        <div><strong>{data.name}</strong></div>
                        <div style={descriptionStyle}>{data.description}</div>
                        <div><a href ={data.link} target="_blank"><button type="button">Learn More</button></a> </div>
                    </div>
                );
            })}
        </div>
    </div>
    )
}