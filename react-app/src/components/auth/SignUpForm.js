import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../common/Button";
import InputField from "../common/InputField";
import { signUp } from "../../store/session";

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 24px;

  button {
    font-size: 13px;
    line-height: 1.4;
    padding: 9px 15px;
  }
`;

const InputsWrapper = styled.div`
  gap: 12px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const PasswordInputsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RegisterButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;

const SignUpForm = ({ onSuccess, toLogin }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp({ username, email, password, location }))
        .unwrap()
        .then(onSuccess)
        .catch((data) => {
          if (data) {
            setErrors(data);
          }
        });
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Heading>
        <h2>Register</h2>
        <Button type="button" variant="outlined" onClick={toLogin}>
          Log In
        </Button>
      </Heading>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <InputsWrapper>
          <InputField
            fullWidth
            label="Username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{
              autoFocus: true,
              type: "text",
            }}
            required
          />
          <InputField
            fullWidth
            label="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              type: "text",
            }}
            required
          />
          <InputField
            fullWidth
            label="Location"
            value={location}
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            inputProps={{
              type: "text",
            }}
            required
          />
          <PasswordInputsWrapper>
            <InputField
              fullWidth
              label="Password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{
                type: "password",
              }}
              required
            />
            <InputField
              fullWidth
              label="Confirm Password"
              value={repeatPassword}
              id="repeat-password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              inputProps={{
                type: "password",
              }}
              required
            />
          </PasswordInputsWrapper>
        </InputsWrapper>
        <RegisterButton type="submit">Register</RegisterButton>
      </form>
    </>
  );
};

export default SignUpForm;
