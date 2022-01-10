
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import CartButton from './cart/CartButton';
import ProfileButton from './profile/ProfileButton'
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpModal';

const NavBar = () => {
  let user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li>
          <CartButton />
        </li>
        {user && <li>
          <ProfileButton user={user} />
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
