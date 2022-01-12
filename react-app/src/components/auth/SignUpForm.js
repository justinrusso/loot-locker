import styled from 'styled-components';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;

const SignUpForm = ({ toLogin }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp({ username, email, password, location })).unwrap().catch((data) => {
        if (data) {
          setErrors(data);
        }
      });
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };


  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Username</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div>
        <label>Location</label>
        <input
          type='text'
          name='location'
          onChange={updateLocation}
          value={location}
          required
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        ></input>
      </div>
      <Actions>
        <button type='button' onClick={toLogin}>Log In</button>
        <button type='submit'>Register</button>
      </Actions>
    </form>
  );
};

export default SignUpForm;
