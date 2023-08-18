import React from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
const MoviePage = ({name, summary, rating, genre, release, trailer}) => {
  return (
    <>
      <h2 className="title">{name}</h2>
      <br />
      <p className="summary">{summary}</p>
      <br />
      <p className="ageRating">{rating}</p>
      <br />
      <p>{genre}</p>
      <br />
      <p>{release}</p>
      <br />
      <YoutubeEmbed embedID={trailer} />

    </>
  );
}

export default MoviePage;
