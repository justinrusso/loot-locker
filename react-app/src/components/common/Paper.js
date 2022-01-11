import styled, { css } from "styled-components";

const roundedEdges = css`
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const Paper = styled.div`
  box-shadow: ${(props) => props.theme.shadows[props.elevation]};
  background-color: ${(props) => props.theme.backgroundColor};
  ${(props) => !props.square && roundedEdges}
`;

Paper.defaultProps = {
  elevation: 0,
  square: false,
};

export default Paper;
