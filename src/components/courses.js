import Navigation from './navigation';

window.addEventListener("load", () => {
	fetch("./data.json").then(response => {
		return response.json();
	 }).then(data => main(data));
});


function main(courseData){}

export default function courses(){
    return(
        <div>
            <Navigation />
            <h1>List of Courses</h1>
            
        </div>
    )
}
