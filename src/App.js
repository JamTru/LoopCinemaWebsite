// import logo from './movie.png';
import React, { useState, useEffect } from "react";
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
import PR_mov from './pages/PR_mov.js';
import SI_mov from './pages/SI_mov.js';
import SM_mov from './pages/SM_mov.js';
import Profile from './pages/Profile.js';

function App() {
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getUser());
  const isLogged = localStorage.getItem("user") !== null ? "loggedIn" : "loggedOut";
  const loginUser = (email, username) => {
    setEmail(email);
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setEmail(null);
  }
  console.log(isLogged);
  return (
    <div>
      <Router>
        <Header email={email} username={username} logoutUser={logoutUser} loginUser={loginUser}/>
        <Navbar logstatus={isLogged} />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/HP_mov.js" element={<HP_mov />} />
          <Route path="/PR_mov.js" element={<PR_mov />} />
          <Route path="/SI_mov.js"  element={<SI_mov />} />
          <Route path="/SM_mov.js" element={<SM_mov />} />
          <Route path="/Profile.js" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
