import React, {useState, useEffect} from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
import ReviewFormModal from '../modals/ReviewFormModal.js';
import ReviewDisplay from './ReviewDisplay.js';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  const [reviewModalOn, setReviewModalOn] = useState(false);//State logic to handle display of modal
  const isLogged = localStorage.getItem("user") !== null ? true : false;
  /*This code block is designed to reduce the influx of fake reviews by restricting the time taken between each review post, so that a user must wait at least a day before posting another review. */
  var enoughTimeSinceLastReview = false;
  var duplicateDetected = false;
  if (isLogged) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem(loggedUser.email) !== null) { // Logic only fires if user is both logged in and has existing review array
      const reviewsArray = JSON.parse(localStorage.getItem(loggedUser.email));
      const sortedArray = reviewsArray.sort((a,b) => Date.parse(b.date.split("-").reverse().join("-")) - Date.parse(a.date.split("-").reverse().join("-"))); // Sorting Array so the most recent review submitted by user is at index 0
      sortedArray.forEach((review) => {
        if (review.name == name) { //For Loop to check if it detects any duplicate reviews
          duplicateDetected = true;
        }
      });
      var today = new Date();
      var dd = String(today.getDate()).padStart(2,'0');
      var mm = String(today.getMonth() + 1).toString().padStart(2,'0');
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      /* The split, reverse and join of date strings was necessary to make sure the Date Object formatted correctly, as if only submitted as DD-MM-YYYY, it would return a NAN as the object, hence the string manipulation.*/
      const comparisonCheck = (Date.parse(today.split("-").reverse().join("-"))) - (Date.parse(sortedArray[0].date.split("-").reverse().join("-")));
      enoughTimeSinceLastReview = (comparisonCheck / (1000 * 60 * 60 * 24)) >= 1 ? true : false //Date Object subtraction returns as milliseconds, so the multiplications represent the conversion to milliseconds to days.
    }
    else {
      enoughTimeSinceLastReview = true;
    }
  }
  //Comment for future people, I tried to put this code block into a useEffect, but wasn't sure how to actually get it to work inside a useEffect
  const allowReview = (isLogged && enoughTimeSinceLastReview) && !duplicateDetected ? "show" : "doNotShow"; //If user is both logged in and not submitted review in 24 hours, allow review button to display.
  const userArray = JSON.parse(localStorage.getItem("users"));
  const usersWithReviews = userArray.filter((user) => localStorage.getItem(user.email) !== null); //Filters for users that have existing reviews in local storage
  return (
    <div>
      <div className="movieInfo">
        <img src={imageRef} className="promophoto"></img>
        <div className="block-display">
          <h2 className="title">{name}</h2>
          <p className="summary">{summary}</p>
          <p className="ageRating" lang={rating == "MA15+" ? "MA" : rating}>{rating}</p>
          <p>{genre + " | " + release}</p>
        </div>
      </div>
      <YoutubeEmbed embedID={trailer} />
      <ReviewFormModal show={reviewModalOn} onHide={()=> setReviewModalOn(false)} movie={name} />
      <div className="background">
        <button type="button" onClick={() => setReviewModalOn(true)} className={allowReview}>Leave a Review!</button>
        <h2>Most Recent Reviews</h2>
        {/*Each user gets mapped and has their reviews handled so that all their reviews are filtered for the given movie of a page.
          The if statement is to handle when none of the reviews match the movie page and as such only returns the component when it is not undefined*/
          usersWithReviews.map((user, index) => {
            const arrayOfReviewDetails = JSON.parse(localStorage.getItem(user.email));
            const reviewDetails = arrayOfReviewDetails.filter((review) => review.name === name)[0];
            if (typeof reviewDetails !== "undefined"){
              return <ReviewDisplay movieName={reviewDetails.name} username={user.username} date={reviewDetails.date} numValue={reviewDetails.numRate} comment={reviewDetails.commentString} />
            }
          })
        }
      </div>
    </div>
  );
}

export default MoviePage;
