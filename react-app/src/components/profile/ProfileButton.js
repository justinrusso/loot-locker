import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import styled from "styled-components"
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const ProfileDropdownDiv = styled.div`
      #profile-button {
            background-color: transparent;
            padding-left: 1vw;
            padding-right: 1vw;
            border: none;
            display: flex;
            justify-content:center;
            flex-direction: row;
            border-radius: 30px;
      }

      #profile-button:hover {
            background-color:rgb(235, 235, 235);
      }

      #profile-icon, #expand-icon {
            padding-top: 10px;
            padding-bottom: 10px;
      }

      #profile-icon {
            padding-left: 0;
            color: grey;
            font-size:x-large;
      }

      #expand-icon {
            color: grey;
            margin-left: 7px;
            align-self:center;
      }

      #profile-dropdown {
            z-index: 2;
            position: absolute;
            display: flex;
            flex-direction: column;
            width: fit-content;
            background-color:rgb(235, 235, 235);
            list-style: none;
            margin-top: 0;
            padding-left: 0;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0px 1px 5px 1px grey;
      }

      .profile-dropdown-li {
            cursor: pointer;
            padding-top: 10px;
            padding-bottom: 10px;
            display:flex;
            border-bottom: 1px solid lightgrey;
      }

      .profile-dropdown-li:hover {
            background-color: lightgrey
      }

      .dropdown-icon {
            /* justify-self:flex-start; */
            margin-left: 5%;
            margin-right: 5%;
      }
`
=======
import styled from "styled-components";
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

  .profile-dropdown-li {
    cursor: pointer;
    padding: 10px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.divider};
  }

  .profile-dropdown-li:hover {
    background-color: lightgrey;
  }

  .dropdown-icon {
    padding-right: 8px;
  }
`;
>>>>>>> 0cfbb3c743d47004da7d368ad313f5ca8f5727f3

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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
      <ProfileIconButton id="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" id="profile-icon" />
        <i className="fas fa-caret-down" id="expand-icon" />
      </ProfileIconButton>
      {showMenu && (
        <ProfileDropdown>
          <li className="profile-dropdown-li">
            <i className="far fa-user dropdown-icon" />
            <span>{user.username}</span>
          </li>
          <li className="profile-dropdown-li">
            <i className="far fa-envelope dropdown-icon" />
            <span>{user.email}</span>
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
