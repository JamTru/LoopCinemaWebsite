// import logo from './movie.png';
import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SignInModal from "./modals/SignInModal";
import { getUser, removeUser } from "./data/repository";

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
        <Content />
        <main role="main">
          <div className="container my-3">
            <Routes>
              {/* <Route path="/" element={<Home username={username} />} /> */}
              {/* <Route path="/modals/SignInModal" element={<SignInModal username={loginUser} />} /> */}
              {/* <Route path="/profile" element={<MyProfile username={username} />} /> */}
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
