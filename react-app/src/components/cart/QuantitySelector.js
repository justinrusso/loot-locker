import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";

import IconButton from "../common/IconButton";

const maximumCharacters = 3;

const QuantitySelectorRoot = styled.div`
  position: relative;

  input {
    border: 2px solid #000;
    border-radius: ${(props) => props.theme.borderRadius.button}px;
    box-sizing: content-box;
    padding: 6px 4ch;
    text-align: center;
    width: ${maximumCharacters}ch;
  }

  .decrement,
  .increment {
    border-radius: ${(props) => props.theme.borderRadius.button}px;
    box-sizing: content-box;
    height: 100%;
    padding: 0 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3ch;
  }

  .decrement {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    left: 0;
  }

  .increment {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    right: 0;
  }
`;

/**
 * @param {string} value
 */
const isValidValue = (value) => {
  return /^\d+$/.test(value);
};

const getMaxValueString = () => {
  let maxValueString = "9";
  for (let i = 1; i < maximumCharacters; i++) {
    maxValueString += "9";
  }
  return maxValueString;
};

/**
 * @param {{
 *   onChange: (newValue) => void;
 *   value: number;
 * }} props
 * @returns
 */
const QuantitySelector = ({ onChange, value }) => {
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  const [currentValue, setCurrentValue] = useState(String(value));

  useEffect(() => {
    setCurrentValue(String(value));
  }, [value]);

  const updateValue = (newValue) => {
    // Prevent value going below 1
    if (isValidValue(newValue) && parseInt(newValue, 10) <= 0) {
      return updateValue("1");
    }

    setCurrentValue(newValue);
    if (isValidValue(newValue)) {
      debouncedOnChange(parseInt(newValue));
    }
  };

  const handleChange = (e) => {
    // Prevent more than 3
    if (e.target.value.length > maximumCharacters) {
      return updateValue(getMaxValueString());
    }
    updateValue(e.target.value);
  };

  const handleButtonClick = (modifier) => {
    if (!isValidValue(currentValue)) {
      return updateValue("1");
    }
    const parsedValue = parseInt(currentValue, 10);
    const newValue = parsedValue + modifier;

    let newValueStr = String(newValue);
    if (newValueStr.length > maximumCharacters) {
      newValueStr = getMaxValueString();
    }
    updateValue(newValueStr);
  };

  /**
   * Prevents keys from trigering a change unless they are considered valid.
   * If the key/key combination pressed is not valid, the event is prevented.
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const filterKeyPresses = (event) => {
    if (/\d/.test(event.key)) {
      return;
    } else if (/(backspace|delete|tab)/i.test(event.code)) {
      return;
    } else if (event.ctrlKey && event.key === "a") {
      return;
    } else if (/arrow(left|right|up|down)/i.test(event.key)) {
      return;
    }
    event.preventDefault();
  };

  /**
   * Checks if the keypress is an up or down and replicates the functionality
   * of pressing the + or - buttons
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleUpDown = (event) => {
    if (/arrowup/i.test(event.key)) {
      handleButtonClick(1);
    } else if (/arrowdown/i.test(event.key)) {
      handleButtonClick(-1);
    }
  };

  return (
    <QuantitySelectorRoot>
      <IconButton
        type="button"
        className="decrement"
        onClick={() => handleButtonClick(-1)}
      >
        -
      </IconButton>
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          filterKeyPresses(e);
          handleUpDown(e);
        }}
      />
      <IconButton
        type="button"
        className="increment"
        onClick={() => handleButtonClick(1)}
      >
        +
      </IconButton>
    </QuantitySelectorRoot>
  );
};

QuantitySelector.defaultProps = {
  value: 1,
};

QuantitySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default QuantitySelector;
