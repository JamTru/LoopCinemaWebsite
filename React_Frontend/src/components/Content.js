import React from 'react';
import {useEffect, useRef} from 'react'
import MovieDisplay from './MovieDisplay';
import slides from "../data/MovieDisplayData.json"; //Passing in JSON Array  to Movie Component
import AboutUs from './AboutUs.js';
import {useLocation} from "react-router-dom";
const Content = () => {
  return (
    <div className="main">
      <MovieDisplay data={slides} />
      <AboutUs />
    </div>
  );
};

export default Content;
/*Photo by <a href="https://unsplash.com/@leopoldkristjansson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Leópold Kristjánsson</a> on <a href="https://unsplash.com/photos/y5vSUD-tDYk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  */
