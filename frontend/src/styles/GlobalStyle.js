import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
    --color-primary: #B8750A;
    --color-primary-dark: #8A5700;
    --color-primary-light: rgba(184, 117, 10, 0.15);
    --color-forest: #4a7c59;
    --color-card: rgba(255, 255, 255, 0.85);
    --color-card-selected: rgba(186, 199, 219, 0.9);
    --color-text: #333;
    --color-border: #ccc;
    --color-error: #c47a7a;
    --color-text-muted: #999;
    --color-text-light: rgba(255, 255, 255, 0.8);
    --color-border-light: rgba(255, 255, 255, 0.3);
    --color-input-bg: rgba(255, 255, 255, 0.9);
    --color-glass: rgba(255, 255, 255, 0.3);
    --color-success: #71e995c5;          
    --color-success-light: rgba(104, 235, 143, 0.18);   
    --color-error-light: rgba(186, 78, 78, 0.31); 
    --color-warning: #d4a574;          
    --color-info: #6b9bd2;             
}

* {
  box-sizing: border-box;
}

h1, h2, h3, h4 {
  margin: 0;
  line-height: 1.2;
  color: var(--color-text);
}

h1 { font-size: clamp(24px, 6vw, 36px); }
h2 { font-size: clamp(20px, 5vw, 28px); }
h3 { font-size: clamp(16px, 4vw, 20px); }

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-image: url("/background2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  color: #333;
}
`;