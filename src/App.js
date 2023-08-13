// import logo from './movie.png';
import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Navbar />
        <Content />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
