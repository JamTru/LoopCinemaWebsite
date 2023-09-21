import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';

function PR_mov() {
  const stringSummary = "Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot (Charlie Hunnam), an untested trainee (Rinko Kikuchi) and an old, obsolete Jaeger.";
  return (
    <div>
      <MoviePage name="Pacific Rim" summary={stringSummary} rating="M" genre="Action / Adventure" release="11/7/2013" trailer="5guMumPFBag" imageRef="/MoviePoster/PC_vertical.jpg"/>
    </div>
  );
}
export default PR_mov;
