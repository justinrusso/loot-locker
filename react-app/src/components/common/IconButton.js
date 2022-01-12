import styled from "styled-components";
import Button from "./Button";

const IconButton = styled(Button)`
  padding: 12px;
  line-height: 1;
`;

IconButton.defaultProps = {
  variant: "text",
};

export default IconButton;
