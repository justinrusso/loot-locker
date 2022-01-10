import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const ProfileDropdownDiv = styled.div`
      position: relative;
      width: 4%;

      #profile-button {
            background-color:transparent;
            border: none;
            display: flex;
            justify-content:center;
            width: 100%;
            flex-direction: row;
            border-radius: 35%
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

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ProfileDropdownDiv>
      <button id="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" id="profile-icon"/>
        <i className="fas fa-caret-down" id="expand-icon"></i>
      </button>
      {showMenu && (
        <ul id="profile-dropdown">
          <li className="profile-dropdown-li">
            <i className="far fa-user dropdown-icon"></i>
            <span>{user.username}</span>
          </li>
          <li className='profile-dropdown-li'>
            <i className="far fa-envelope dropdown-icon"></i>
            <span>{user.email}</span>
          </li>
          <li className='profile-dropdown-li'>
            <i class="fas fa-sign-out-alt dropdown-icon"></i>
            <span onClick={handleLogout}>Sign out</span>
          </li>
        </ul>
      )}
    </ProfileDropdownDiv>
  );
}

export default ProfileButton;