import React, { useState, useEffect }from "react";
import MoviePage from '../components/MoviePage.js';
import {retrieveDataByMovieID, testAPICall} from '../data/repository.js';

function HP_mov() {
  const stringSummary = "The fourth movie in the Harry Potter franchise sees Harry (Daniel Radcliffe) returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron (Rupert Grint) and Hermione (Emma Watson). There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry's name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.";
  const [movieInfo, setMovieInfo] = useState([]);
  useEffect(() => {
    async function loadMovieData() {
      const movieData = await retrieveDataByMovieID("2");
      setMovieInfo(movieData);
    }
    loadMovieData();
  }, []);
  return (
    <div>
      <MoviePage name={movieInfo.title} summary={movieInfo.summary} rating={movieInfo.ageRatingAgeRating} genre={movieInfo.genre} release={movieInfo.releaseDate} trailer="7lJ6Suyp1ok" imageRef="/MoviePoster/HP_Vertical.jpg" movieID={movieInfo.movieID} />
    </div>
  );
}
export default HP_mov;
