import React, { Fragment } from "react";

const List = () => {
  return (
    <Fragment>
      <h2 className="my-2">Interviews Scheduled</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Interviewer</th>
            <th>Candidate</th>
            <th>Date</th>
            <th className="hide-sm">Start Time</th>
            <th className="hide-sm">End Time</th>
          </tr>
        </thead>
        {/* <tbody>{educations}</tbody> */}
      </table>
    </Fragment>
  );
};

export default List;
