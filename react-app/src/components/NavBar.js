
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import styled from "styled-components"

import CartButton from './cart/CartButton';
import ProfileButton from './profile/ProfileButton'
import LoginFormModal from './auth/LoginFormModal';
// import SignUpFormModal from './auth/SignUpModal';

const StyledNavElement = styled.nav`
  display: flex;
  height: 10vh;
  padding-left: 10vw;
  padding-right: 10vw;
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
    padding: 0;
    display flex;
    height: 100%;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav-li {
    display: flex;
  }

  #logo {
    font-size: x-large;
  }

  #search-section {
    height: 50%;
    align-items: center;
    border: 2px solid black;
    border-radius: 30px;
  }

  #search-input {
    font-size: large;
    border: none;
    width: 60vw;
    border-radius: 20px;
    padding-left: 1vw;
  }

  #search-input:focus {
    outline: none;
  }

  #search-icon {
    align-self: center;
    padding-right: 1vw;
  }

  #login-button {
    font-size: larger;
    padding: 15% 1vw;
  }

  #cart-button {
    padding: 15% 1vw;
  }

`

const NavBar = () => {
  let user = useSelector(state => state.session.user)

  return (
    <StyledNavElement>
      <ul id="nav-ul">
        <li className="nav-li">
          <NavLink to='/' exact={true} activeClassName='active'>
            <span id="logo">Logo</span>
          </NavLink>
        </li>
        <li className="nav-li" id="search-section">
          <form>
            <input id="search-input" placeholder="Search for loot"></input>
          </form>
          <i className="fas fa-search" id="search-icon"></i>
        </li>
        {user && <li className="nav-li">
          <ProfileButton user={user} />
        </li>}
        {!user && <li className="nav-li">
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
