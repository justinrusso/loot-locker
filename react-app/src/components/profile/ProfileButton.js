import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";
import IconButton from "../common/IconButton";

const ProfileButtonRoot = styled.div`
  position: relative;
`;

const ProfileIconButton = styled(IconButton)`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const ProfileDropdown = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: fit-content;
  background-color: rgb(235, 235, 235);
  list-style: none;
  margin-top: 0;
  padding-left: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 1px 5px 1px grey;
  z-index: 1000;

  .profile-dropdown-li {
    padding: 10px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.divider};

    a {
      color: currentcolor;
    }
  }

  .profile-dropdown-li:not(.profile-details):hover {
    background-color: lightgrey;
    cursor: pointer;
  }

  .dropdown-icon {
    padding-right: 8px;
  }
`;

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ProfileButtonRoot>
      <ProfileIconButton onClick={handleButtonClick}>
        <i className="fas fa-user-circle" id="profile-icon" />
        <i className="fas fa-caret-down" id="expand-icon" />
      </ProfileIconButton>
      {showMenu && (
        <ProfileDropdown>
          <li className="profile-dropdown-li profile-details">
            <div>
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
          </li>
          <li className="profile-dropdown-li">
            <Link to="/items/new">Sell an item</Link>
          </li>
          <li className="profile-dropdown-li">
            <i className="fas fa-sign-out-alt dropdown-icon" />
            <span onClick={handleLogout}>Sign out</span>
          </li>
        </ProfileDropdown>
      )}
    </ProfileButtonRoot>
  );
};

export default ProfileButton;
