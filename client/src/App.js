import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import Schedule from "./components/Schedule";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Schedule} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
