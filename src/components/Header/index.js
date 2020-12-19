/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { useDispatch, connect } from "react-redux";
import { SignOut, signIn } from "../actions";

import "./header.styles.scss";

const Header = ({ token }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(history)

  const [activeItem, setActiveItem] = React.useState("home");

  const handleItemClick = (e) => {

    // if (name === 'logout') dispatch(signOut())
    // else if (name === 'home') history.push('/')
    // else history.push('/signin')
  };

  return (
    <Menu secondary style={{ padding: 20 }}>
      <Menu.Item name="home" onClick={() => history.push('/')} />

      <Menu.Menu position="right">
        {token ? (
          <Menu.Item name="logout" onClick={() => dispatch(SignOut())} />
        ) : (
            <Menu.Item name="login" onClick={() => history.push('/signin')} />
          )}
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Header);
