import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


const Routes = ({ signedIn }) => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route
          exact
          path="/signin"
          render={() => (signedIn ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (signedIn ? <Redirect to="/" /> : <SignUp />)}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  signedIn: state.auth.token,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Routes);
