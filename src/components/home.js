import Navigation from './navigation';
import AIBert from './chatbot.js'
import { createElement, useEffect, useState } from 'react';
import { courseData } from "../courseData.js";
import globalVariables from './globals/globalVariables';
import fillDetails from './globals/detailsFiller';
import fade from './globals/elementFader';
import './components.css';


export default function Home(){
    globalVariables.presenting = false;
    globalVariables.transitioning = false;
    globalVariables.home = true;

    function transitionComplete() {
        globalVariables.transitioning = false;
    }

    function chatbotVanish() {
        globalVariables.transitioning = true;
        globalVariables.presenting = true;
        var elem = document.getElementsByClassName("mascot").item(0).firstChild;
        var pos = '150px';
        elem.style.setProperty('margin-top',pos);
        var moveFunc = setInterval(function(){
            var elem = document.getElementsByClassName("mascot").item(0).firstChild;
            pos = String(parseInt(pos.slice(0,-2)) + 1) + 'px';
            elem.style.setProperty('margin-top',pos);
        }, 30)
        elem.style.opacity = 1;
        var mascotFadeFunc = setInterval(function() {fade(elem,-0.1,[mascotFadeFunc,moveFunc],[miniAppear])},30);
        document.getElementsByClassName("AI-Bert-speech").item(0).firstChild.style.opacity = 1;
        var textFadeFunc = setInterval(function() {fade(document.getElementsByClassName("AI-Bert-speech").item(0).firstChild,-0.1,[textFadeFunc])},30);
        moveInput(false);
    }

    function chatbotAppear() {
        var elem = document.getElementsByClassName("mascot").item(0).firstChild;
        var pos = '158px';
        elem.style.setProperty('margin-top',pos);
        var moveFunc = setInterval(function(){
            var elem = document.getElementsByClassName("mascot").item(0).firstChild;
            pos = String(parseInt(pos.slice(0,-2)) - 1) + 'px';
            elem.style.setProperty('margin-top',pos);
            if (parseInt(pos.slice(0,-2)) < 150) {
                elem.style.setProperty('margin-top','150px');
                clearInterval(moveFunc);
                globalVariables.transitioning = false;
                return;
            }
        }, 30)
        elem.style.opacity = 0;
        var mascotFadeFunc = setInterval(function() {fade(elem,0.1,[mascotFadeFunc],[transitionComplete])},30);
        document.getElementsByClassName("AI-Bert-speech").item(0).firstChild.style.opacity = 0;
        var textFadeFunc = setInterval(function() {fade(document.getElementsByClassName("AI-Bert-speech").item(0).firstChild,0.1,[textFadeFunc])},30);
    }

    function miniVanish() {
        globalVariables.transitioning = true;
        globalVariables.presenting = false;
        var elem = document.getElementsByClassName("miniMascot").item(0);
        var pos = '-85px';
        elem.style.setProperty('top',pos);
        var moveFunc = setInterval(function(){
            pos = String(parseInt(pos.slice(0,-2)) + 1) + 'px';
            elem.style.setProperty('top',pos);
        }, 30)
        elem.style.opacity = 1;
        var mascotFadeFunc = setInterval(function() {fade(elem,-0.1,[mascotFadeFunc,moveFunc],[chatbotAppear])},30);
        globalVariables.mini = false;
    }

    function miniAppear() {
        var elem = document.getElementsByClassName("miniMascot").item(0);
        var pos = '-78px';
        elem.style.setProperty('top',pos);
        var moveFunc = setInterval(function(){
            pos = String(parseInt(pos.slice(0,-2)) - 1) + 'px';
            elem.style.setProperty('top',pos);
            if (parseInt(pos.slice(0,-2)) < -85) {
                elem.style.setProperty('top','-85px');
                clearInterval(moveFunc);
                return;
            }
        }, 30)
        elem.style.opacity = 0;
        var mascotFadeFunc = setInterval(function() {fade(elem,0.1,[mascotFadeFunc],[courseAppear])},30);
        globalVariables.mini = true;
    }

    function courseVanish() {
        document.getElementsByClassName("AI-Bert-speech").item(0).childNodes[1].style.opacity = 1;
        var textFadeFunc = setInterval(function() {fade(document.getElementsByClassName("AI-Bert-speech").item(0).childNodes[1],-0.1,[textFadeFunc])},30);
        document.getElementsByClassName("courseDetails").item(0).style.opacity = 1;
        var courseFadeFunc = setInterval(function() {fade(document.getElementsByClassName("courseDetails").item(0),-0.1,[courseFadeFunc])},30);
    }

    function courseAppear() {
        fillDetails(globalVariables.currentCourseID);
        document.getElementsByClassName("AI-Bert-speech").item(0).childNodes[1].style.opacity = 0;
        var textFadeFunc = setInterval(function() {fade(document.getElementsByClassName("AI-Bert-speech").item(0).childNodes[1],0.1,[textFadeFunc],[buttonsAppear])},30);
        document.getElementsByClassName("courseDetails").item(0).style.opacity = 0;
        var courseFadeFunc = setInterval(function() {fade(document.getElementsByClassName("courseDetails").item(0),0.1,[courseFadeFunc])},30);
    }

    function buttonsVanish() {
        buttonVanish(document.getElementById('openCourse'));
        buttonVanish(document.getElementById('notRelevant'));
        buttonVanish(document.getElementById('tooEasy'));
        buttonVanish(document.getElementById('tooHard'));
        buttonVanish(document.getElementById('bookmark'));
    }

    function buttonsAppear() {
        var buttons = document.getElementsByClassName('responseButton');
        for (let button of buttons) {
            switch (button.id) {
                case "bookmark":
                    if (button.style.opacity > 0) ; //bookmark course
                    break;
                default:
                    button.addEventListener('click', (event) => {
                        if (button.style.opacity > 0 && !globalVariables.transitioning) inputHandling(button.innerHTML);
                    },false);
                    break;
            }
        }
        setTimeout(function() { buttonAppear(document.getElementById('openCourse')); }, 0);
        setTimeout(function() { buttonAppear(document.getElementById('notRelevant')); }, 200);
        setTimeout(function() { buttonAppear(document.getElementById('tooEasy')); }, 400);
        setTimeout(function() { buttonAppear(document.getElementById('tooHard')); }, 600);
        setTimeout(function() { buttonAppear(document.getElementById('bookmark'),true); }, 800);
    }

    function buttonVanish(elem) {
        elem.style.cursor = 'default';
        elem.style.opacity = 1;
        var fadeFunc = setInterval(function() {fade(elem,-0.1,[fadeFunc])},30);
    }

    function buttonAppear(elem,complete = false) {
        elem.style.cursor = 'pointer';
        elem.style.opacity = 0;
        var fadeFunc = setInterval(function() {fade(elem,0.1,[fadeFunc])},30);
        elem.style.top = "10px";
        var moveFunc = setInterval(function() {
            elem.style.top = String(parseInt(elem.style.top.slice(0,-2)) - 1) + "px";
            if (elem.style.top == "0px") {
                clearInterval(moveFunc);
                if (complete) transitionComplete();
            }
        }, 30)
    }

    function progToPosition(prog) {
        var start = [50,0];
        var topMove = 220;
        var leftMove = -200;
        return [prog*topMove + start[0],prog*leftMove + start[1]];
    }

    function moveInput(ascending) {
        var elem = document.getElementsByClassName("form__group").item(0);
        var span = ascending?20:24;
        var count = ascending?span:0;
        var pos;
        var moveFunc = setInterval(function(){
            if (ascending) {
                count--;
            } else count++;
            pos = progToPosition((Math.tanh((count/span)*5-2.5)+1)/2);
            elem.style.setProperty('margin-top',pos[0]+"px");
            elem.style.setProperty('margin-left',pos[1]+"px");
            if (count == span || count == 0) {
                clearInterval(moveFunc);
            }
        }, span)
    }

    function search(input, difficulty = 2) {
        globalVariables.input = input; //so it can be accessed later, when a response button is pressed
        if (difficulty > 3) difficulty = 3; //due to there being no courses of difficulty 4
        var keyTerms = input.split(",") //replace with Watson's NLP results
        keyTerms = keyTerms.map(term => term.toLowerCase());

        //Data cleanup:
        for (var i = 0; i < globalVariables.synonyms.length; i++) {
            for (var j = 0; j < globalVariables.synonyms[i].length - 1; j++) {
                if (keyTerms.includes(globalVariables.synonyms[i][j])) {
                    keyTerms[keyTerms.indexOf(globalVariables.synonyms[i][j])] = globalVariables.synonyms[i][globalVariables.synonyms[i].length-1]
                }
            }
        }

        var completed = [] //should be taken from database
        var score = {};
        courseData.forEach(function(course) {
            //Check if course already completed, skip course if so
            score[course["id"]] = grade(keyTerms, course["id"]);
            if (score[course["id"]] < 0) {
                delete score[course["id"]];
            }
        });
        var sorted = Object.keys(score).map(
            (key) => { return [key, score[key], courseData.find(item => item.id === key)["difficulty"]] }
        );
        var order;
        switch (difficulty) {
            case 2:
                order = [2,1,3];
                break;
            case 3:
                order = [3,2,1];
                break;
            default:
                order = [1,2,3];
                break;
        }
        sorted.sort(
            (first, second) => { return order.indexOf(first[2]) - order.indexOf(second[2])}
        );
        sorted.sort(
            (first, second) => { return second[1] - first[1]}
        );
        console.log(sorted);
        var matches = sorted.map(
            (e) => { return e[0] }
        );
        return matches;
    }

    function grade(keyTerms, id) {
        var courseTerms = courseData.find(item => item.id === id)["terms"];
        var score = 0;
        for (var i = 0; i < courseTerms.length; i++) {
            if (keyTerms.includes(courseTerms[i].toLowerCase())) {
                score += 1; //weight based on term relevance
            } else score -= 0.1;
        }
        var courseTitle = courseData.find(item => item.id === id)["name"];
        for (var i = 0; i < keyTerms.length; i++) {
            if (isMatch(courseTitle,keyTerms[i])) {
                score += 1;
            } else {
                for (var j = 0; j < globalVariables.synonyms.length; j++) {
                    if (globalVariables.synonyms[j][globalVariables.synonyms[j].length-1] == keyTerms[i]) {
                        for (var k = 0; k < globalVariables.synonyms[j].length - 1; k++) {
                            if (isMatch(courseTitle,globalVariables.synonyms[j][k])) {
                                score += 1;
                            }
                            break
                        }
                    }
                }
            }
        }
        return score;
    }

    function isMatch(searchOnString, searchText) {
        searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        return searchOnString.match(new RegExp("\\b"+searchText+"\\b", "i")) != null;
    }

    function inputHandling(input) {
        if (input != "") {
            var matches;
            switch (input.toLowerCase()) {
                case "open":
                    window.open(courseData.find(item => item.id === globalVariables.currentCourseID)["link"], '_blank');
                    break;
                case "not relevant":
                    //Course Search using previous input
                    matches = globalVariables.results;
                    matches.shift();
                    globalVariables.results = matches;
                    break;
                case "too easy":
                    if (courseData.find(item => item.id === globalVariables.currentCourseID)["postreq"].length > 0) {
                        matches = courseData.find(item => item.id === globalVariables.currentCourseID)["postreq"];
                    } else if (courseData.find(item => item.id === globalVariables.currentCourseID)["difficulty"] < 3) {
                        console.log("here");
                        matches = search(globalVariables.input, courseData.find(item => item.id === globalVariables.currentCourseID)["difficulty"] + 1); //make search exclusive to difficulty level? new argument?
                    } else matches = [];
                    globalVariables.results = matches;
                    break;
                case "too hard":
                    //Convert to Learning Journeys!!
                    if (courseData.find(item => item.id === globalVariables.currentCourseID)["prereq"].length > 0) {
                        matches = courseData.find(item => item.id === globalVariables.currentCourseID)["prereq"];
                    } else if (courseData.find(item => item.id === globalVariables.currentCourseID)["difficulty"] > 1) {
                        matches = search(globalVariables.input, courseData.find(item => item.id === globalVariables.currentCourseID)["difficulty"] - 1); //make search exclusive to difficulty level? new argument?
                    } else matches = [];
                    globalVariables.results = matches;
                    break;
                default:
                    //Course Search from scratch
                    matches = search(input); //Also pass user_difficulty from database
                    globalVariables.results = matches;
                    break;
            }
            if (matches.length > 0) {
                    globalVariables.currentCourseID = matches[0];
                    globalVariables.transitioning = true;
                if (globalVariables.presenting) {
                    buttonsVanish();
                    courseVanish();
                    setTimeout(courseAppear,500);
                } else {
                    chatbotVanish();
                }
            } else if (globalVariables.presenting) {
                    console.log("here");
                    miniVanish();
                    moveInput(true);
                    courseVanish();
                    buttonsVanish();
            }
            document.getElementById('input').value = "";
            document.getElementById('input').blur();
        }
    }

    document.addEventListener('keydown', (event) => {
        var name = event.key;
        if (name == "Enter" && !globalVariables.transitioning) {
            inputHandling(document.getElementById('input').value);
        }
    },false);

    if (globalVariables.mini) {
        setTimeout(miniVanish,10);
    }
    
    return(
        <div>
            <Navigation />
            <AIBert />
        </div>
    );
}
