import React, { Fragment } from "react";
import List from "./layout/List";

const Schedule = () => {
  return (
    <Fragment>
      <h1 className=" text-primary">Schedule an Interview</h1>

      <form className="form">
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
            type="email"
            placeholder="Candidate"
            name="candidate"
            required
          />
        </div>
        <div className="form-group">
          <input type="date" placeholder="Date" name="date" required />
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
