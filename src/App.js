import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";




import Home from './/components/home.js'
import Courses from './/components/courses.js'
import Profile from './components/profile';
import LearningJourney from './components/learningJourney.js';
import Bookmarks from './components/bookmarks.js'



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}index />
        <Route path="Home" element={<Home />} index />
        <Route path="Courses" element={<Courses />} index />
        <Route path="Profile" element={<Profile />} index />
        <Route path="LearningJourney" element={<LearningJourney />} index />
        <Route path="LearningJourney" element={<LearningJourney />} index />
        <Route path="Bookmarks" element={<Bookmarks />} index />
      </Routes>
    </BrowserRouter> 
    
    </div>
  );
}

export default App;
