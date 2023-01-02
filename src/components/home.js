import Navigation from './navigation';
import AIBert from './chatbot.js'
import { useEffect, useState } from 'react';

export default function Home(){

    return(
        <div>
            <Navigation />
            <AIBert />
        </div>
    );
}