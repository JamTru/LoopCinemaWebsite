// import logo from './movie.png';
import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SignInModal from "./modals/SignInModal";
import { getUser, removeUser } from "./data/repository";
import HP_mov from './pages/HP_mov.js';

function App() {
  const [username, setUsername] = useState(getUser());

  const loginUser = (username) => {
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }

  return (
    <div>
      <Router>
        <Header username={username} logoutUser={logoutUser} loginUser={loginUser}/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/HP_mov.js" element={<HP_mov />} />
          <Route path="#About-Us" element={<Content />} />
         </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
