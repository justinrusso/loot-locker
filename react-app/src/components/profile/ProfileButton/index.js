import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';

import './ProfileButton.css'

function ProfileButton({ user }) {
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id="profile-dropdown-component">
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
            <span onClick={logout}>Sign out</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
