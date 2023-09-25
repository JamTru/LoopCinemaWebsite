import React from 'react';
import {useEffect, useRef} from 'react'
import MovieDisplay from './MovieDisplay';
import slides from "../data/MovieDisplayData.json"; //Passing in JSON Array  to Movie Component
import AboutUs from './AboutUs.js';
import {useLocation} from "react-router-dom";
import {testAPICall} from "../data/repository.js";
const Content = () => {
  async function APITest(){
    const test = await testAPICall();
    console.log(test);
  }
  return (
    <div className="main">
      <MovieDisplay data={slides} />
      <AboutUs />
      <button type="button" onClick={() => APITest()}>Test Button</button>
    </div>
  );
};

export default Content;
/*Photo by <a href="https://unsplash.com/@leopoldkristjansson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Leópold Kristjánsson</a> on <a href="https://unsplash.com/photos/y5vSUD-tDYk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  */
