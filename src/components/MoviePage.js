import React from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  return (
    <div>
      <div className="movieInfo">
        <img src={imageRef} className="promophoto"></img>
        <h2 className="title">{name}</h2>
        <p className="summary">{summary}</p>
        <p className="ageRating" lang={rating == "MA15+" ? "MA" : rating}>{rating}</p>
        <p>{genre}</p>
        <p>{release}</p>
      </div>
      <YoutubeEmbed embedID={trailer} />
    </div>
  );
}

export default MoviePage;
