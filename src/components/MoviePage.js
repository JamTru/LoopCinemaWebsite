import React, {useState} from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
import ReviewFormModal from '../modals/ReviewFormModal.js';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  const [reviewModalOn, setReviewModalOn] = useState(false);

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
      <ReviewFormModal show={reviewModalOn} onHide={()=> setReviewModalOn(false)} />
      <button type="button" onClick={() => setReviewModalOn(true)}>Leave a Review!</button>
    </div>
  );
}

export default MoviePage;
