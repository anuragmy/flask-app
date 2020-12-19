/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Container, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { message } from 'antd'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../actions";
import "tachyons";

const SignUp = () => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    email: "anuragmy@hotmail.com",
    password: "anurag",
    confirmPassword: "anurag",
    errors: [],
    color: {
      email: "black",
      name: "black",
      password: "black",
      confirmPassword: "black",
    },
  });

  const [loading] = React.useState(false);

  const { errors, color, email, password } = state;

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const checkErrors = () => {
    const { name, email, password, confirmPassword } = state;
    if (!name)
      return setState({
        ...state,
        errors: { name: "Please add a valid name" },
        color: {
          email: "black",

          password: "black",
          confirmPassword: "black",
          name: "red",
        },
      });
    if (
      !email ||
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return setState({
        ...state,
        errors: { email: "Please add a valid email" },
        color: {
          name: "black",
          password: "black",
          confirmPassword: "black",
          email: "red",
        },
      });
    if (!password)
      return setState({
        ...state,
        errors: { password: "Please add a valid password" },
        color: {
          email: "black",
          name: "black",

          confirmPassword: "black",
          password: "red",
        },
      });
    if (!confirmPassword || password !== confirmPassword)
      return message.info('Passwords do not match')
    // return setState({
    //   ...state,
    //   errors: { confirmPassword: "Password do not match" },
    //   color: {
    //     email: "black",
    //     name: "black",
    //     password: "black",

    //     confirmPassword: "red",
    //   },
    // });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkErrors() && !errors.length) {
      setState({
        ...state,
        errors: [],
        color: {
          email: "black",
          name: "black",
          password: "black",
          confirmPassword: "black",
        },
      });

    }

    dispatch(signUp(email, password));
  };

  return loading ? (
    <LinearProgress />
  ) : (
      <Container style={{ marginTop: "5%" }}>
        <Grid
          item
          xs={12}
          style={{ width: 500, marginLeft: "auto", marginRight: "auto" }}
        >
          <h1>I do not have an account </h1>
          <h3 style={{ fontWeight: "lighter" }}>
            Sign up wth your email and password
        </h3>
          <form>

            <label style={{ fontSize: 20, fontWeight: "bolder" }}>Email</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={state.email}
              style={{
                border: "none",
                borderBottom: `1px solid ${color.email}`,
                padding: 10,
                marginBottom: 20,
                fontSize: 20,
                width: "100%",
              }}
            />
            <br />
            {errors.email && <Alert severity="error">{errors.email}</Alert>}

            <br />
            <label style={{ fontSize: 20, fontWeight: "bolder" }}>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={state.password}
              style={{
                border: "none",
                borderBottom: `1px solid ${color.password}`,
                padding: 10,
                marginBottom: 20,
                fontSize: 20,
                width: "100%",
              }}
            />
            {state.errors.password && (
              <Alert severity="error">{errors.password}</Alert>
            )}

            <br />
            <label style={{ fontSize: 20, fontWeight: "bolder" }}>
              Confirm Password
          </label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={state.confirmPassword}
              style={{
                border: "none",
                borderBottom: `1px solid ${color.confirmPassword}`,
                padding: 10,
                marginBottom: 20,
                fontSize: 20,
                width: "100%",
              }}
            />
            {state.errors.confirmPassword && (
              <Alert severity="error">{errors.confirmPassword}</Alert>
            )}

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
                Sign Up
            </span>
            </a>


            <h3>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "black" }}>
                Sign In
            </Link>
            </h3>
          </form>
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

export default SignUp;
