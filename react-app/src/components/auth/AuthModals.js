import styled from "styled-components";
import { useAuthModal } from "../../context/AuthModalProvider";
import Dialog from "../common/Dialog";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AuthModals = () => {
  const { close, loginVisible, signupVisible, switchForms } = useAuthModal();

  if (!loginVisible && !signupVisible) {
    return null;
  }

  return (
    <Dialog onClose={close}>
      <FormWrapper>
        {loginVisible && <LoginForm onSuccess={close} toSignUp={switchForms} />}
        {signupVisible && (
          <SignUpForm onSuccess={close} toLogin={switchForms} />
        )}
      </FormWrapper>
    </Dialog>
  );
};

export default AuthModals;
