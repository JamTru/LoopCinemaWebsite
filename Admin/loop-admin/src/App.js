
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState} from 'react';
import NavBar from './Components/NavBar.js';
import LandingPage from './pages/LandingPage.js';
import AltPage from './pages/AltPage.js';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/alt" element={<AltPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
