import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      component={() => !token ? <Redirect to="/" /> : <Component />}
    />
  )
}

const mstp = (state) => ({
  token: state.auth.token
})

export default connect(mstp)(PrivateRoute)
