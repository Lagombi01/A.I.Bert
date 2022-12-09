import Navigation from './navigation';




export default function courses(){
    return(
        <div>
            <Navigation />
            <h1>List of Courses</h1>
            
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
