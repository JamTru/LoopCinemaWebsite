import React from 'react';

const UpcomingSchedule = (props) => {
  return (
    <div class="schedule">
      <h4>{props.name}</h4>
      <h5>Monday</h5>
      <h5>Tuesday</h5>
      <h5>Wednesday</h5>
      <h5>Thursday</h5>
      <h5>Friday</h5>
      <h5>Saturday</h5>
      <h5>Sunday</h5>
      <p>Times</p>
      {props.schedule.map(time =>{
        //TBD, keep getting object cannot be parsed as child
      })}
    </div>
  );
};

export default UpcomingSchedule;
