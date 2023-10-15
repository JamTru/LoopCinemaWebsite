// import logo from './movie.png';
import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { getDate, getUsername, getEmail, getDisplayUsername, getPassword, getUser, removeUser } from "./data/repository";
import HP_mov from './pages/HP_mov.js';
import PR_mov from './pages/PR_mov.js';
import SI_mov from './pages/SI_mov.js';
import SM_mov from './pages/SM_mov.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';

function App() { 
  // Initializing 
  const [user, setUser] = useState(getUser());
  const [username, setUsername] = useState(getUsername()); // Gets user info from localStorage but when is null won't get any info
  const [displayUsername, setDisPlayUsername] = useState(getDisplayUsername());
  const [email, setEmail] = useState(getEmail());
  const [date, setDate] = useState(getDate());
  const [password, setPassword] = useState(getPassword());

  // Initializing login user infomation
  const loginUser = (username, displayUsername, password, email, date) => {
    setEmail(email);
    setDisPlayUsername(displayUsername);
    setUsername(username);
    setPassword(password);
    setEmail(email);
    setDate(date);
  }

  // it removes login status and also gets rid of from USER key from localStorage
  const logoutUser = () => {
    setUsername(null);
    setDisPlayUsername(null)
    setEmail(null)
    setDate(null)
    setPassword(null)
    removeUser();
    
  }
// routing pages. so whenever we go to the path we can directly connects to the related page
// Each page we passed the props
  return (
    <div>
      <Router>
        <Header email={email} username={username} displayUsername={displayUsername} password={password} data={date} logoutUser={logoutUser} loginUser={loginUser}/>
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
