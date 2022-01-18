import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../common/Button";
import InputField from "../common/InputField";
import { login, loginDemo } from "../../store/session";

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

const SignInButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;

const DemoCTA = styled.p`
  text-align: center;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const DemoLoginButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: underline;
`;

const LoginForm = ({ onSuccess, toSignUp }) => {
  const [errors, setErrors] = useState({});
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
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
    return <Redirect to="/" />;
  }

  return (
    <>
      <Heading>
        <h2>Sign in</h2>
        <Button type="button" variant="outlined" onClick={toSignUp}>
          Register
        </Button>
      </Heading>
      <form onSubmit={onLogin}>
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
            error={!!errors.cred}
            helperText={errors.cred?.[0]}
            required
          />
          <InputField
            fullWidth
            label="Password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              type: "text",
            }}
            error={!!errors.password}
            helperText={errors.password?.[0]}
            required
          />
        </InputsWrapper>
        <SignInButton type="submit" variant="contained" fullWidth>
          Sign in
        </SignInButton>
        <DemoCTA>
          Looking to test out the site?{" "}
          <DemoLoginButton type="button" onClick={handleLoginDemo}>
            Login as Demo
          </DemoLoginButton>
        </DemoCTA>
      </form>
    </>
  );
};

export default LoginForm;
