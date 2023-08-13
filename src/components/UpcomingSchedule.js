import React from 'react';

const UpcomingSchedule = (props) => {
  return (
    <div class={props.className}>
      <h4>{props.name}</h4>
      <h5>Monday</h5>
      <h5>Tuesday</h5>
      <h5>Wednesday</h5>
      <h5>Thursday</h5>
      <h5>Friday</h5>
      <h5>Saturday</h5>
      <h5>Sunday</h5>
      <p>Times</p>
      {Object.values(props.schedule).map(([day,time]) =>{
          console.log(time);
          return <p>{time}</p>
          //Need to fix, this won't render times properly
        })
      }
    </div>
  );
};

export default UpcomingSchedule;
