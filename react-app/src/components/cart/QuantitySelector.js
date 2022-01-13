import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";

const QuantitySelectorRoot = styled.div`
  position: relative;
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
    updateValue(e.target.value);
  };

  const handleButtonClick = (modifier) => {
    if (!isValidValue(currentValue)) {
      updateValue("1");
      return;
    }
    const parsedValue = parseInt(currentValue, 10);
    updateValue(String(parsedValue + modifier));
  };

  return (
    <QuantitySelectorRoot>
      <button type="button" onClick={() => handleButtonClick(-1)}>
        -
      </button>
      <input type="text" value={currentValue} onChange={handleChange} />
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
