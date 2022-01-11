import styled from "styled-components";
import Button from "./Button";

const IconButton = styled(Button)`
  padding: 12px;
`;

IconButton.defaultProps = {
  variant: "text",
};

export default IconButton;
