/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { signIn } from "../actions";
// import GoogleLogin from "react-google-login";
import "tachyons";

const SignIn = ({ loading, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("anuragmy@hotmail.com");
  const [password, setPassword] = useState("anurag");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password)
      return setErrors(errors.concat({ err: "All Fields Required" }));
    dispatch(signIn(email, password));
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <Grid
        item
        xs={12}
        style={{ width: 500, marginLeft: "auto", marginRight: "auto" }}
      >
        <h1>Have an account ?</h1>
        <h3 style={{ fontWeight: "lighter" }}>
          Sign In wth your email and password
        </h3>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 20, fontWeight: "bolder" }}>Email</label>
          <br />
          <input
            type="email"
            style={{
              border: "none",
              borderBottom: "1px solid black",
              paddingTop: 20,
              marginBottom: 20,
              fontSize: 20,
              width: "80%",
            }}
            value={email}
            onChange={changeEmail}
          />
          <br />
          <br />
          <label style={{ fontSize: 20, fontWeight: "bolder" }}>Password</label>
          <br />
          <input
            type="password"
            style={{
              border: "none",
              borderBottom: "1px solid black",
              paddingTop: 20,
              marginBottom: 20,
              fontSize: 20,
              width: "80%",
            }}
            value={password}
            onChange={changePassword}
          />
          <br />

          <a
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              cursor: "pointer",
              textAlign: "center",
            }}
            className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
            onClick={handleSubmit}
          >
            <span className="pl1" style={{ fontSize: 20 }}>
              Sign In
            </span>
          </a>



        </form>
        <h3>
          Dont' have an account?{" "}
          <Link to="/signup" style={{ color: "black" }}>
            Sign Up
          </Link>
        </h3>
      </Grid>
      <style jsx="true">
        {`
          input:focus {
            outline: none;
          }
        `}
      </style>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.authLoading,
  user: state.auth.token,
});

export default connect(mapStateToProps, null)(SignIn);
