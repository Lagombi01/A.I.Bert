import Navigation from './navigation';
import AIBert from './chatbot.js'
<<<<<<< Updated upstream
=======
import { createElement, useEffect, useState } from 'react';
import globalVariables from './globals/globalVariables';
import fillDetails from './globals/detailsFiller';
import './components.css';
>>>>>>> Stashed changes

export default function home(){
    return(
        <div>
            <Navigation />
            <AIBert />
        </div>
    );
}