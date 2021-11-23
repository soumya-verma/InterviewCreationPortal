import React, { Fragment } from "react";
import List from "./layout/List";

const Schedule = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    // var date1 = document.getElementById("date");
    // console.log(date1.value);
  };

  return (
    <Fragment>
      <h1 className=" text-primary">Schedule an Interview</h1>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Interviewer"
            name="interviewer"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Candidate"
            name="candidate"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Date"
            name="date"
            id="date"
            required
          />
        </div>
        <small className="form-text">
          Enter the time in 24 Hour format, <i> for eg. 03:00</i>
        </small>
        <div className="form-group">
          <input type="text" placeholder="Start Time" name="start" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="End Time" name="end" />
        </div>
        <input type="submit" className="btn btn-primary" value="Schedule" />
      </form>
      <List />
    </Fragment>
  );
};

export default Schedule;
