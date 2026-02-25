import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
  --color-primary: #6b5e75;
  --color-primary-dark: #4d4f59;
  --color-primary-light: rgba(107, 94, 117, 0.15);
  --color-forest: #4a7c59;
  --color-card: rgba(227, 224, 217, 0.85);
  --color-card-selected: rgba(121, 124, 139, 0.25);
  --color-text: #302e2f;
  --color-border: #bcb3a8;
  --color-error: #c47a7a;
  --color-text-muted: #646774;
  --color-text-light: rgba(255, 255, 255, 0.8);
  --color-border-light: rgba(255, 255, 255, 0.3);
  --color-input-bg: rgba(227, 224, 217, 0.9);
  --color-glass: rgba(227, 224, 217, 0.3);
  --color-success: #71e995c5;
  --color-success-light: rgba(104, 235, 143, 0.18);
  --color-error-light: rgba(186, 78, 78, 0.12);
  --color-warning: #bcb3a8;
  --color-info: #797c8b;
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