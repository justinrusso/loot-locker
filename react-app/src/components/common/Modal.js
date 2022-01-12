import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalRoot = styled.div`
  inset: 0px;
  position: fixed;
  z-index: ${(props) => props.theme.zIndex.modal};
`;

const ModalBackground = styled.div`
  background-color: ${(props) => !props.transparent && "rgba(0, 0, 0, 0.5)"};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 225ms
    ${(props) => props.theme.transitions.easing.easeInOut} 0ms;
`;

/**
 * A barebones modal component.
 * For some default styling, use Dialog
 * @param {{
 *  children: React.ReactNode;
 *  hideBackground: boolean;
 *  onClose: () => void;
 * }} props
 */
const Modal = ({ children, hideBackground, onClose }) => {
  const backgroundRef = useRef();

  useEffect(() => {
    if (hideBackground) {
      return;
    }
    const timeout = setTimeout(() => {
      if (backgroundRef.current) {
        backgroundRef.current.style.opacity = 1;
      }
    });

    return () => clearTimeout(timeout);
  }, [hideBackground]);

  return createPortal(
    <ModalRoot>
      <ModalBackground
        onClick={onClose}
        ref={backgroundRef}
        transparent={hideBackground}
      />
      {children}
    </ModalRoot>,
    document.body
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func,
  hideBackground: PropTypes.bool,
};

export default Modal;
