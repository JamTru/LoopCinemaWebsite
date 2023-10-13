// import logo from './movie.png';
import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import SignInModal from "./modals/SignInModal";
import { getDate, getEmail, getPassword, getUser, removeUser, findUser } from "./data/repository";
import HP_mov from './pages/HP_mov.js';
import PR_mov from './pages/PR_mov.js';
import SI_mov from './pages/SI_mov.js';
import SM_mov from './pages/SM_mov.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';

function App() { 
  const [username, setUsername] = useState(findUser().username); // Gets user info from localStorage but when is null won't get any info
  const [displayUsername, setDisplayUsername] = useState(findUser().displayUsername);
  const [email, setEmail] = useState(getEmail());
  const [date, setDate] = useState(getDate());
  const [password, setPassword] = useState(getPassword());
  const [user, setUser] = useState(getUser());
  // Initializing login user infomation
  const loginUser = (username, displayUsername, password, email, date) => {
    setUsername(username);
    setDisplayUsername(displayUsername)
    setPassword(password);
    setEmail(email);
    setDate(date);
    console.log(">>>>>>>>>> " + username)
  }

  // it removes login status and also gets rid of from USER key from localStorage
  const logoutUser = () => {
    removeUser();
    setEmail(null);
  }
// routing pages. so whenever we go to the path we can directly connects to the related page
// Each page we passed the props
  return (
    <div>
      <Router>
        <Header email={email} username={username} displayUsername={displayUsername} password={password} logoutUser={logoutUser} loginUser={loginUser}/>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Content />} />
          <Route path="/HP_mov.js" element={<HP_mov />} />
          <Route path="/PR_mov.js" element={<PR_mov />} />
          <Route path="/SI_mov.js"  element={<SI_mov />} />
          <Route path="/SM_mov.js" element={<SM_mov />} />
          <Route path="/Profile.js" element={<Profile email={email} date={date} username={username} displayUsername={displayUsername} password={password} logoutUser={logoutUser} />} />
          <Route path="/Profile.js/EditProfile.js" element={<EditProfile email={email} date={date} username={username} displayUsername={displayUsername} password={password} logoutUser={logoutUser} loginUser={loginUser}/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
