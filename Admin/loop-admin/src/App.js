
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState} from 'react';
import NavBar from './Components/NavBar.js';
import LandingPage from './pages/LandingPage.js';
import MovieCreatorPage from './pages/AltPage.js';
import Footer from './Components/Footer.js';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/alt" element={<MovieCreatorPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
