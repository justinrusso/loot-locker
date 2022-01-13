import styled from 'styled-components'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, loginDemo } from '../../store/session';
import InputField from '../common/InputField';

const InputsWrapper = styled.div`
  gap: 8px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;

const LoginForm = ({ onSuccess, toSignUp }) => {
  const [errors, setErrors] = useState([]);
  const [cred, setCred] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ cred, password }))
      .unwrap()
      .then(onSuccess)
      .catch((data) => {
        if (data) {
          setErrors(data);
        }
      });
  };

  const handleLoginDemo = async (e) => {
    e.preventDefault();
    dispatch(loginDemo()).unwrap().then(onSuccess);
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
      <InputsWrapper>
        <InputField
          fullWidth
          label="Username or Email"
          value={cred}
          id="cred"
          onChange={(e) => setCred(e.target.value)}
          inputProps={{
            autoFocus: true,
            type: "text",
          }}
          required
        />
        <InputField
          fullWidth
          label="Password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            autoFocus: true,
            type: "text",
          }}
          required
        />
      </InputsWrapper>
      <button type="button" onClick={handleLoginDemo}>
        Demo Login
      </button>
      <Actions>
        <button type='button' onClick={toSignUp}>Register</button>
        <button type='submit'>Login</button>
      </Actions>
    </form>
  );
};

export default LoginForm;
