import styled, { css } from "styled-components";

const containedButtonStyles = css`
  color: ${(props) => props.theme.backgroundColor};

  &:after {
    background-color: ${(props) => props.theme.color};
  }

  &:not(:disabled):hover {
    &:after {
      transform: scaleX(1.015) scaleY(1.035);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.07),
        rgba(255, 255, 255, 0.07)
      );
    }
  }
`;

const textButtonStyles = css`
  &:after {
    transform: scaleX(0.7) scaleY(0.7);
  }

  &:not(:disabled):hover {
    &:after {
      transform: scaleX(1.015) scaleY(1.035);
      background-color: rgba(0, 0, 0, 0.075);
    }
  }
`;

const Button = styled.button`
  background-color: initial;
  border: 0;
  border-radius: 24px;
  padding: 12px 18px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  z-index: 1;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: inherit;
    border: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: transform 200ms cubic-bezier(0.345, 0.115, 0.135, 1.42),
      background 150ms ease-out, box-shadow 200ms ease-out;
  }

  ${(props) => props.variant === "contained" && containedButtonStyles}
  ${(props) => props.variant === "text" && textButtonStyles}
`;

Button.defaultProps = {
  variant: "contained",
};

export default Button;
