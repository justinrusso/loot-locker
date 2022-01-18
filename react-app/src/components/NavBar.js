import styled from "styled-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Button from "./common/Button";
import CartButton from "./cart/CartButton";
import Container from "./common/Container";
import IconButton from "./common/IconButton";
import ProfileButton from "./profile/ProfileButton";
import { selectUser } from "../store/session";
import { useAuthModal } from "../context/AuthModalProvider";

const StyledNavElement = styled.header`
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.divider};

  a {
    text-decoration: none;
  }

  .nav-inner {
    display flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 6px;
    padding-bottom: 12px;
    row-gap: 8px;

    @media (min-width: 900px) {
      padding-top: 12px;
    }
  }

  .logo {
    font-family: ${(props) => props.theme.typography.fontSerif};
    font-size: 24px;
    padding-right: 12px;

    a {
      color: ${(props) => props.theme.palette.text.primary};
    }
  }

  .search-wrapper {
    border-radius: 30px;
    flex: 1 1 100%;
    order: 2;

    @media (min-width: 900px) {
      flex-basis: 0%;
      order: 0;
      padding-right: 16px;
    }

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
        line-height: inherit;
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

  .main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .auth-button {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    padding: 9px 15px;
  }
`;

const NavBar = () => {
  const authModal = useAuthModal();
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
          <nav className="main-nav">
            {user && <ProfileButton user={user} />}
            {!user && (
              <Button
                className="auth-button"
                variant="text"
                onClick={() => authModal.show()}
              >
                Sign in
              </Button>
            )}
            <CartButton className="cart-button" />
          </nav>
        </div>
      </Container>
    </StyledNavElement>
  );
};

export default NavBar;
