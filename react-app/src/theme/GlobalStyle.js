import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        background-color:transparent;
        border: none;
        justify-content:center;
        border-radius: 35%
    }

    button:hover {
        background-color:rgb(235, 235, 235);
    }
`;

export default GlobalStyle;
