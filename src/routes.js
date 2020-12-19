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
import Dashboard from "./components/Dashboard";
import UploadedPics from "./components/UploadedPics";
import PrivateRoute from './privateRoute'


const Routes = ({ token }) => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact component={Home} path="/" />
          <PrivateRoute exact component={Dashboard} path="/dashboard" />
          <PrivateRoute exact component={UploadedPics} path="/images" />
          <Route
            exact
            path="/signin"
            render={() => (token ? <Redirect to="/" /> : <SignIn />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (token ? <Redirect to="/" /> : <SignUp />)}
          />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(Routes);
