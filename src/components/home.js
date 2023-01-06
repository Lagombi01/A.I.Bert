import Navigation from './navigation';
import AIBert from './chatbot.js'
import { createElement, useEffect, useState } from 'react';
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
            button.addEventListener('click', (event) => {
                if (button.style.opacity > 0) document.getElementById('input').value = button.innerHTML;
            },false);
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

    document.addEventListener('keydown', (event) => {
        var name = event.key;
        if (name == "Enter" && !globalVariables.transitioning) {
            if (globalVariables.presenting) {
                if (document.getElementById('input').value != "") {
                    globalVariables.currentCourseID = document.getElementById('input').value; //Temporary line which skips watson/NLU, will be replaced
                    globalVariables.transitioning = true;
                    buttonsVanish();
                    courseVanish();
                    setTimeout(courseAppear,500);
                } else {
                    miniVanish();
                    moveInput(true);
                    courseVanish();
                    buttonsVanish();
                }
            } else if (document.getElementById('input').value != "") {
                globalVariables.currentCourseID = document.getElementById('input').value; //Temporary line which skips watson/NLU, will be replaced
                globalVariables.transitioning = true;
                chatbotVanish();
            }
            document.getElementById('input').value = "";
            document.getElementById('input').blur();
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
