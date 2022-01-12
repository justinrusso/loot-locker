import styled from "styled-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import CartButton from "./cart/CartButton";
import Container from "./common/Container";
import IconButton from "./common/IconButton";
import LoginFormModal from "./auth/LoginFormModal";
import ProfileButton from "./profile/ProfileButton";
import { selectUser } from "../store/session";

const StyledNavElement = styled.header`
  width: 100%;
  border-bottom: 2px solid lightgrey;

  a {
    text-decoration: none;
  }

  .nav-inner {
    display flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 900px) {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .logo {
    font-size: 24px;
    padding-right: 12px;
  }

  .search-wrapper {
    flex: 1 1 0%;
    border-radius: 30px;
    padding-right: 16px;
    
    form {
      border: 2px solid black;
      border-radius: 96px;
      background-color: rgba(0, 0, 0, 0.05);
      width: 100%;
      display: flex;
      align-items: center;
      posiiton: relative;
    }

    input {
      background-color: transparent;
      border-bottom-left-radius: 96px;
      border-bottom-right-radius: 0;
      border-top-left-radius: 96px;
      border-top-right-radius: 0;
      border: none;
      flex: 1;
      height: 48px;
      line-height: 28px;
      min-width: 0;
      outline: none;
      padding-bottom: 9px;
      padding-left: 18px;
      padding-right: 42px;
      padding-top: 9px;
      width: 100%;

      & + ${IconButton} {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        padding-bottom: 12px;
        padding-left: 15px;
        padding-right: 21px;
        padding-top: 12px;
      }

      &:focus {
        background-color: ${(props) => props.theme.backgroundColor};

        & + ${IconButton} {
          color: ${(props) => props.theme.backgroundColor};

          &:after {
            background-color: ${(props) => props.theme.color};
            transform: scaleX(1.015) scaleY(1.035);
          }
        }
      }
    }
  }

  .cart-button {
    font-size: 24px;
  }
`;

const NavBar = () => {
  const history = useHistory();

  const user = useSelector(selectUser());

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
      <Container>
        <div className="nav-inner">
          <div className="logo">
            <Link to="/">Loot Locker</Link>
          </div>
          <div className="search-wrapper">
            <form onSubmit={searchSubmit}>
              <input
                placeholder="Search for loot"
                value={searchKey}
                onChange={updateKey}
              />
              <IconButton>
                <i className="fas fa-search" id="search-icon"></i>
              </IconButton>
            </form>
          </div>
          {user && <ProfileButton user={user} />}
          {!user && <LoginFormModal />}
          <CartButton className="cart-button" />
        </div>
      </Container>
    </StyledNavElement>
  );
};

export default NavBar;
