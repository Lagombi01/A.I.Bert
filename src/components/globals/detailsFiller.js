import { courseData } from "../../courseData.js";

export default function fillDetails(id) {
    var course = courseData.find(item => item.id === id);
    console.log(course);
    document.getElementsByClassName("courseTitle").item(0).innerHTML = course.name;
    document.getElementsByClassName("courseDescription").item(0).innerHTML = course.description;
    document.getElementsByClassName("courseImage").item(0).firstChild.setAttribute("src",course.image);
}