import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

import CartButton from "./cart/CartButton";
import ProfileButton from "./profile/ProfileButton";
import { useAuthModal } from "../context/AuthModalProvider";

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

`;

const NavBar = () => {
  const authModal = useAuthModal();
  const history = useHistory();

  let user = useSelector((state) => state.session.user);

  const [searchKey, setSearchKey] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearchKey("");
    history.push(`/search?key=${searchKey}`);
  };

  const updateKey = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <StyledNavElement>
      <ul id="nav-ul">
        <li className="nav-li">
          <NavLink to="/" exact={true} activeClassName="active">
            <span id="logo">Logo</span>
          </NavLink>
        </li>
        <li className="nav-li" id="search-section">
          <form onSubmit={searchSubmit}>
            <input
              id="search-input"
              placeholder="Search for loot"
              value={searchKey}
              onChange={updateKey}
            ></input>
            <button>
              <i className="fas fa-search" id="search-icon"></i>
            </button>
          </form>
        </li>
        {user && (
          <li className="nav-li">
            <ProfileButton user={user} />
          </li>
        )}
        {!user && (
          <li className="nav-li">
            <button onClick={() => authModal.show()}>Log In</button>
          </li>
        )}
        <li className="nav-li">
          <CartButton />
        </li>
      </ul>
    </StyledNavElement>
  );
};

export default NavBar;
