import { courseData } from "../../courseData.js";

export default function fillDetails(id) {
    var course = courseData.find(item => item.id === id);
    console.log(course);
    document.getElementsByClassName("courseTitle").item(0).innerHTML = course.name;
    document.getElementsByClassName("courseDescription").item(0).firstChild.innerHTML = course.description;
    if (course.duration == 1) {
        document.getElementsByClassName("courseDescription").item(0).childNodes[1].innerHTML = "Length: 1 Hour";
    } else if (course.duration > 0) {
        document.getElementsByClassName("courseDescription").item(0).childNodes[1].innerHTML = "Length: " + String(course.duration) + " hours";
    } else if (course.duration == -1) {
        document.getElementsByClassName("courseDescription").item(0).childNodes[1].innerHTML = "Length: Collection";
    } else document.getElementsByClassName("courseDescription").item(0).childNodes[1].innerHTML = "";
    
    document.getElementsByClassName("courseImage").item(0).firstChild.setAttribute("src",course.image);
}