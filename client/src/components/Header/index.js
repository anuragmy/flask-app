import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Input, Menu } from 'semantic-ui-react'

import { useDispatch, connect } from "react-redux";
import { signOut, signIn } from "../actions";

import "./header.styles.scss";


const Header = ({ token }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeItem, setActiveItem] = React.useState('home')


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === 'logout') return dispatch(signOut())
    if (name === 'home') return history.push('/')
    else history.push('/signin')

  }

  return (
    <Menu secondary style={{ padding: 20 }}>
      <Menu.Item
        name='home'
        onClick={handleItemClick}
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name={token ? 'logout' : 'login'}
          active={activeItem === 'logout'}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.token
})

export default connect(mapStateToProps)(Header);
