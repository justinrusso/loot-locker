import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const HelperTextWrapper = styled.p`
  color: ${(props) =>
    props.error
      ? props.theme.palette.error
      : props.theme.palette.text.secondary};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  line-height: 1.66;
  margin: 3px 14px 0;
`;

const HelperTextIcon = styled.i`
  margin-right: 8px;
  margin-left: -10px;
`;

/**
 * HelperText props type definition
 * @typedef {Object} HelperTextProps
 * @property {React.ReactNode | React.ReactNode[]} children
 * @property {string} className
 * @property {boolean} [error] Indicates if there is an error for this input field
 * @property {boolean} [showIcon]
 */

/**
 *
 * @param {HelperTextProps} props
 * @returns
 */
const HelperText = ({ children, className, error, showIcon }) => {
  return (
    <HelperTextWrapper className={className} error={error}>
      {showIcon && <HelperTextIcon className="fas fa-exclamation-circle" />}
      {children}
    </HelperTextWrapper>
  );
};

HelperText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  showIcon: PropTypes.bool,
};

export default HelperText;
