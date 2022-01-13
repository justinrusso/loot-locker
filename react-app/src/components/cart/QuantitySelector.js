import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";

const maximumCharacters = 3;

const QuantitySelectorRoot = styled.div`
  position: relative;

  input {
    box-sizing: content-box;
    text-align: center;
    width: ${maximumCharacters}ch;
  }
`;

/**
 * @param {string} value
 */
const isValidValue = (value) => {
  return /^\d+$/.test(value);
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
    setCurrentValue(newValue);
    if (isValidValue(newValue)) {
      debouncedOnChange(parseInt(newValue));
    }
  };

  const handleChange = (e) => {
    // Prevent more than 3
    if (e.target.value.length > maximumCharacters) {
      return;
    }
    updateValue(e.target.value);
  };

  const handleButtonClick = (modifier) => {
    if (!isValidValue(currentValue)) {
      return updateValue("1");
    }
    const parsedValue = parseInt(currentValue, 10);
    const newValue = parsedValue + modifier;

    // Prevent value going below 1
    if (newValue <= 0) {
      return updateValue("1");
    }

    let newValueStr = String(newValue);
    if (newValueStr.length > maximumCharacters) {
      newValueStr = "9";
      for (let i = 1; i < maximumCharacters; i++) {
        newValueStr += "9";
      }
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
      <button type="button" onClick={() => handleButtonClick(-1)}>
        -
      </button>
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          filterKeyPresses(e);
          handleUpDown(e);
        }}
      />
      <button type="button" onClick={() => handleButtonClick(1)}>
        +
      </button>
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
