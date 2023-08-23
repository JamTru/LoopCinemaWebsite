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
import { getDate, getEmail, getUser, removeUser } from "./data/repository";
import HP_mov from './pages/HP_mov.js';
import PR_mov from './pages/PR_mov.js';
import SI_mov from './pages/SI_mov.js';
import SM_mov from './pages/SM_mov.js';
import Profile from './pages/Profile.js';

function App() {
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [date, setDate] = useState(getDate());
  const isLogged = localStorage.getItem("user") !== null ? "loggedIn" : "loggedOut";
  const loginUser = (email, username, date) => {
    setEmail(email);
    setUsername(username);
    setDate(date);
  }

  const logoutUser = () => {
    removeUser();
    setEmail(null);
  }

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   var now = new Date();
  //   var year = now.getFullYear();
  //   var month = now.getMonth();
  //   var date = now.getDate();
  //   var day = now.getDay();
    
    
  //   console.log("Now : ", year);
  //   console.log("Now : ", month + 1);
  //   console.log("Now : ", date);
  //   console.log("Now : ", day);
  //   console.log("Now : ", 
  // },[]);

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
          <Route path="/Profile.js" element={<Profile email={email} date={date} username={username} logoutUser={logoutUser} loginUser={loginUser}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
