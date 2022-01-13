import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

import HelperText from "./HelperText";

const InputFieldRoot = styled.div`
  border: 0;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  padding: 0;
  position: relative;
  vertical-align: top;
  width: ${(props) => props.fullWidth && "100%"};
`;

const InputLabel = styled.label`
  color: ${(props) =>
    props.error
      ? props.theme.palette.error
      : props.focused
      ? props.theme.palette.primary.main
      : props.theme.palette.text.secondary};
  font-size: 1rem;
  left: 0;
  letter-spacing: 0.00938em;
  line-height: 1.4375em;
  max-width: calc(133% - 24px);
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  top: 0;
  transform-origin: left top;
  transform: ${(props) =>
    props.focused || props.hasValue
      ? `translate(14px, -9px) scale(0.75)`
      : `translate(14px, 16px) scale(1)`};
  transition: color 200ms ${(props) => props.theme.transitions.easing.easeOut}
      0ms,
    transform 200ms ${(props) => props.theme.transitions.easing.easeOut} 0ms,
    max-width 200ms ${(props) => props.theme.transitions.easing.easeOut} 0ms;
  white-space: nowrap;
  width: 100%;
  z-index: 1;
`;

const InputRoot = styled.div`
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: ${(props) => props.theme.palette.text.primary};
  cursor: text;
  display: inline-flex;
  font-size: 1rem;
  letter-spacing: 0.00938em;
  line-height: 1.4375em;
  padding: 16.5px 14px;
  position: relative;
  width: ${(props) => props.fullWidth && "100%"};
`;

const Input = styled.input`
  background: none;
  border: 0;
  box-sizing: content-box;
  color: currentcolor;
  display: block;
  font: inherit;
  height: ${(props) => 1.4375 * (props.rows || 1)}em;
  letter-spacing: inherit;
  margin: 0;
  min-width: 0px;
  outline: 0;
  resize: none;
  width: 100%;
`;

const InputFieldset = styled.fieldset`
  border-color: ${(props) =>
    props.error
      ? props.theme.palette.error
      : props.focused
      ? props.theme.palette.primary.main
      : props.hovered
      ? props.theme.palette.text.primary
      : `rgba(${props.theme.palette.text.base}, 0.23)`};
  border-radius: inherit;
  border-style: solid;
  border-width: ${(props) => (props.focused ? 2 : 1)}px;
  inset: -5px 0 0;
  margin: 0;
  min-width: 0;
  outline: 0;
  overflow: hidden;
  padding: 0 8px;
  pointer-events: none;
  position: absolute;
`;

const Legend = styled.legend`
  display: block;
  float: unset;
  font-size: 0.75em;
  height: 11px;
  max-width: ${(props) =>
    props.focused || props.hasValue ? "100%" : "0.01px"};
  padding: 0;
  transition: max-width ${(props) => (props.focused ? 100 : 50)}ms
    ${(props) => props.theme.transitions.easing.easeOut}
    ${(props) => (props.focused ? 50 : 0)}ms;
  visibility: hidden;
  white-space: nowrap;
  width: auto;

  & > span {
    padding: 0 5px;
    display: inline-block;
  }
`;

/**
 * InputField props type definition
 * @typedef {Object} InputFieldProps
 * @property {boolean} [error] Indicates if there is an error for this input field
 * @property {boolean} [fullWidth] If the input should be full width
 * @property {string} [helperText]
 * @property {string} id
 * @property {Object} [inputProps] Properties to pass to the input element
 * @property {string} label
 * @property {(e) => void} [onChange] Called when the input's value changes
 * @property {string | number} [value] The input's value
 */

/**
 *
 * @param {InputFieldProps} props
 * @returns
 */
const InputField = ({
  error,
  fullWidth,
  helperText,
  id,
  inputProps,
  label,
  onChange,
  required,
  value,
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const inputRef = useRef();

  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(Boolean(inputRef.current?.value));
  }, [value]);

  return (
    <InputFieldRoot fullWidth={fullWidth}>
      <InputLabel
        focused={focused}
        error={error}
        hasValue={hasValue}
        id={`${id}-label`}
        htmlFor={id}
      >
        {label}
        {required && <span>&nbsp;*</span>}
      </InputLabel>
      <InputRoot
        fullWidth={fullWidth}
        onClick={() => inputRef.current?.focus()}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Input
          {...inputProps}
          ref={inputRef}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        />
        <InputFieldset error={error} focused={focused} hovered={hovered}>
          <Legend focused={focused} hasValue={hasValue}>
            <span>
              {label}
              {required && " *"}
            </span>
          </Legend>
        </InputFieldset>
      </InputRoot>
      {helperText && (
        <HelperText error={error} showIcon={error}>
          {helperText}
        </HelperText>
      )}
    </InputFieldRoot>
  );
};

InputField.propTypes = {
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputField;
