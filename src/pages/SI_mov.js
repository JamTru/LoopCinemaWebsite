import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';

function SI_mov() {
  const stringSummary = "The implausible escape of a brilliant murderess brings U.S. Marshal Teddy Daniels (Leonardo DiCaprio) and his new partner (Mark Ruffalo) to Ashecliffe Hospital, a fortress-like insane asylum located on a remote, windswept island. The woman appears to have vanished from a locked room, and there are hints of terrible deeds committed within the hospital walls. As the investigation deepens, Teddy realizes he will have to confront his own dark fears if he hopes to make it off the island alive.";
  return (
    <div>
      <MoviePage name="Shutter Island" summary={stringSummary} rating="MA15+" genre="Mystery / Suspense" release="18/02/2010" trailer="v8yrZSkKxTA" />
    </div>
  );
}
export default SI_mov;
