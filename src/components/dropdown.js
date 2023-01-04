export default function Dropdown(){
    return(
        <div>
            <Dropdown />
            <button class="dropdownButton">More Features</button>
            <div class="dropdownOptions">
            <!-- Below links currently using placeholders - CHANGE THESE TO RESPECTIVE PAGES -->
            <a href="[LINK]">User Profile</a>
            <a href="[LINK]">View All Courses</a>
            <a href="[LINK]">Saved Courses</a>
            <a href="[LINK]">Learning Journeys</a>
            </div>
            
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
