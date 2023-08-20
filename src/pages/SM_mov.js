import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';

function SM_mov() {
  const stringSummary = "Bitten by a radioactive spider in the subway, Brooklyn teenager Miles Morales suddenly develops mysterious powers that transform him into the one and only Spider-Man. When he meets Peter Parker, he soon realizes that there are many others who share his special, high-flying talents. Miles must now use his newfound skills to battle the evil Kingpin, a hulking madman who can open portals to other universes and pull different versions of Spider-Man into our world.";
  return (
    <div>
      <MoviePage name="Spider-Man: Into the Spider-Verse" summary={stringSummary} rating="PG" genre="Family / Action" release="26/12/2018" trailer="g4Hbz2jLxvQ" imageRef="/MoviePoster/SM_vertical.jpg" />
    </div>
  );
}
export default SM_mov;
