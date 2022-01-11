import { createGlobalStyle, css } from "styled-components";

/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
const resetCss = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  // https://www.joshwcomeau.com/css/custom-css-reset/#digit-tweaking-line-height
  * {
    line-height: calc(1em + 0.5rem);
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root,
  #__next {
    isolation: isolate;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${resetCss}

    body {
        font-family: 'Roboto', sans-serif;
    }

    button {
        background-color:transparent;
        border: none;
        justify-content:center;
        border-radius: 30px;
    }

    button:hover {
        background-color:rgb(235, 235, 235);
    }
`;

export default GlobalStyle;
