import React  from "react";
import { Routes, Route } from "react-router-dom";
import PlayMe from "./PlayMe";
import './style.css';



function App() {
    return (
        
        <Routes>

          <Route path="/" element={<PlayMe />} />
          
        </Routes>
       
    );
  }
export default App
