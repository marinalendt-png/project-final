import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
    --color-primary: #4a7c59;
    --color-card: rgba(255, 255, 255, 0.85);
    --color-card-selected: rgba(232, 245, 233, 0.9);
    --color-text: #333;
    --color-border: #ccc;
  }

  * {
    box-sizing: border-box;
  }

    body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url("/background.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh;
    color: #333;
  }
`;