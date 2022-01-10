import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [cred, setCred] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ cred, password }))
      .unwrap()
      .catch((data) => {
        if (data) {
          setErrors(data);
        }
      });
  };

  const updateCred = (e) => {
    setCred(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='cred'>Username or Email</label>
        <input
          name='cred'
          type='text'
          value={cred}
          onChange={updateCred}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
          required
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
