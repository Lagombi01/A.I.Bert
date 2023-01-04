import Navigation from './navigation';
import './components.css';

export default function Course(){
    return(
        <div>
<<<<<<< Updated upstream
            <style>
                body{
<<<<<<< HEAD
                background-color: pink;
=======
            {/* <style>
                #courseBody{
                    background-color: pink;
>>>>>>> Stashed changes
=======
                    background-color: pink;
>>>>>>> main
                }
            
                .acorn-icon, .acorn-icon-hover, .acorn-icon-bookmarked{
                    width: 100px;
                    height: 100px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    position: relative;
                }
                .acorn-icon{
                    background-image: url("Images/Acorn.svg");    
                }
                .acorn-icon-bookmarked{
                    background-image: url("Images/BookmarkedAcorn.svg")
                }
                .acorn-icon-hover{
                    z-index: -1;
                }
                .acorn-icon:hover .acorn-icon-hover{
                    background-image: url("Images/AcornGlow.svg");
                }
                .acorn-icon-bookmarked:hover .acorn-icon-hover{
                    background-image: url("Images/AcornGlow.svg");
                }
            </style> */}
         
            <body id = "courseBody">
            
                <div id="Top Bar">
                    <div class="row">
                        <!-- Serve Watson Graphic with hyperlink to Home screen -->
                        <div id="home_button" class="text-center col-sm-11">
                            <!-- INSERT LINK TO HOME PAGE HERE -->
                            <!-- INSERT LINK TO WATSON ICON HERE -->
                            <!-- ADD HEIGHT AND WIDTH PARAMETERS IF NEEDED -->
                            <img src="../Images/" class="img-fluid rounded" alt="icon" href="" >
                        </div>
                        
                        <!-- Bookmark Icon -->
                        <div id="Bookmark col-sm-1">
                            <div class="container-fluid">
                                <div class="acorn-icon" id="image">
                                    <div class="acorn-icon-hover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Serve Course Image and Description -->
                <!-- Functional buttons to move through Learning Journey (?) -->
                <div id="Course Information">
                    <div class="container-fluid">    
                        <div class="row">    
                            <!-- Course Image -->
                            <div class="col-sm-6">
                                <!-- INSERT COURSE IMAGE HERE -->
                                <!-- ADD HEIGHT AND WIDTH PARAMETERS IF NEEDED -->
                                <img src="../Images/" class="img-fluid rounded" alt="image representing the course">
                            </div>
                            <!-- Course Description -->
                            <div class="col-sm-6" col align-self-center>
                                <div class="container-fluid">
                                    <figure class="text-left">
                                        <blockquote class="blockquote">
                                            <p>
                                                <!-- Insert Course Description here -->
                                                kjashdljsdfkjdsf
                                                psdfjpsokdpfoksdfpodjfp;ksdf
                                                isdfjs;dfsldfjsdlf;sdlfks
                                            </p>
                                        </blockquote>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Feedback Response Buttons -->
                <div id="Feedback Buttons">
                    <div class="container-fluid">
                        <div class="row">
                            <!-- Insert onclick commands here -->
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-light" onclick="">This is too hard</button>
                            </div>
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-light" onclick="">This isn't what I was looking for</button> 
                            </div>
                        </div class="row">
                    </div>
                </div>
                
                <script>
                    
                    function changeImage(event) {
                        console.log("click");
                        var image = event.srcElement
                        if (image.classList.contains("acorn-icon")){
                            image.classList.remove("acorn-icon");
                            image.classList.add("acorn-icon-bookmarked");
                        } else {
                            image.classList.remove("acorn-icon-bookmarked");
                            image.classList.add("acorn-icon");
                        }   
                    }
                    function loadOnclicks() {
                        var loadElement = (element) => {
                            var el = document.getElementById(element);
                            el.removeAttribute("id");
                            return el; 
                        };
                        
                        loadElement("image").addEventListener("click", changeImage);
                    }
                    
                    function windowLoad() {
                        loadOnclicks();
                    }
                    
                    window.onload = windowLoad;
                </script>
                
            </body>
        </div>
    )
}
