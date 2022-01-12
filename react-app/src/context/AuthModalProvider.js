import { createContext, useState, useContext } from "react";

import AuthModals from "../components/auth/AuthModals";

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

const AuthModalProvider = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const close = () => {
    setLoginVisible(false);
    setSignupVisible(false);
  };

  const switchForms = () => {
    setLoginVisible((prev) => !prev);
    setSignupVisible((prev) => !prev);
  };

  return (
    <AuthModalContext.Provider
      value={{
        close,
        loginVisible,
        show: () => setLoginVisible(true),
        signupVisible,
        switchForms,
      }}
    >
      <AuthModals />
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
