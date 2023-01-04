import Navigation from './navigation';
<<<<<<< Updated upstream




export default function courses(){
    return(
        <div>
            <Navigation />
            <h1>List of Courses</h1>
            
=======
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
>>>>>>> Stashed changes
        </div>
        <style>
            .dropdown {
                position: relative;
                display: inline-block
            }
            .dropdownButton {
                background-color: #ad815a; 
                padding: 1em;
                font-size: 12px;
                font-weight: bold;
            }
            .dropdown:hover .dropdownOptions {
                display: block;
            }
            .dropdownOptions {
                background-color: #e8e0dd;
                position: absolute;
                display: none;
            }
            .dropdownOptions a {
                color: black;
                padding: 0.8em 1.1em;
                text-decoration: none;
                text-align: center;
                display: block;
            }
            .dropdownOptions a:hover {
                background-color: #fce883;
            }
        </style>
    )
}
