import React from 'react';
import './ReviewDisplay.css';
const ReviewDisplay = ({movieName, username, date, numValue, comment}) => {
  let score = null;
  if (numValue < 40) {
    score = "B";
  } else if (numValue < 70) {
    score = "M";
  } else {
    score = "G";
  }
  return (
    <div className="reviewCompartment">
      <div className="boxed">
        <p><span lang={score}>{numValue}</span><i> {username}</i></p>
        <p>{date}</p>
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default ReviewDisplay;
