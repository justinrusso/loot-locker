
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import styled from "styled-components"

import CartButton from './cart/CartButton';
import ProfileButton from './profile/ProfileButton'
import LoginFormModal from './auth/LoginFormModal';

const StyledNavElement = styled.nav`
  display: flex;
  height: 15vh;
  padding-left: 15%;
  padding-right: 15%;
  align-items: center;
  border-bottom: 2px solid lightgrey;

  li {
    list-style: none;
    padding: none;
  }

  a {
    text-decoration: none;
  }

  #nav-ul {
    display flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
  }

  .nav-li {
    display: flex;
  }

  #logo {
    font-size: x-large;
    justify-self: center;
  }

  #search-input {
    width: 30vw
  }



`

const NavBar = () => {
  let user = useSelector(state => state.session.user)

  return (
    <StyledNavElement>
      <ul id="nav-ul">
        <li className="nav-li">
          <NavLink to='/' exact={true} activeClassName='active'>
            <span id="logo">loot locker</span>
          </NavLink>
        </li>
        <li className="nav-li">
          <form>
            <input id="search-input" placeholder="Search for loot"></input>
          </form>
          <i className="fas fa-search"></i>
        </li>
        {user && <li className="nav-li">
          <ProfileButton user={user}/>
        </li>}
        {!user && <li className="nav-li">
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <LoginFormModal />
        </li>}
        <li className="nav-li">
          <CartButton />
        </li>
      </ul>
    </StyledNavElement>
  );
}

export default NavBar;
