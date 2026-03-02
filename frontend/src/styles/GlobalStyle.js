import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
  --color-primary: #6b5e75;
  --color-primary-dark: #4d4f59;
  --color-forest: #4a7c59;
  --color-forest-light: rgba(74, 124, 89, 0.25);
  --color-card: rgba(227, 224, 217, 0.85);
  --color-text: #302e2f;
  --color-border: #bcb3a8;
  --color-border-light: rgba(255, 255, 255, 0.3);
  --color-energy-high: #a8d5ba;
  --color-energy-mid: #f0c060;
  --color-energy-low: #c26e6eff;
  --color-error: #c47a7a;
  --color-error-light: rgba(186, 78, 78, 0.12);
  --color-error-dark: #a05050;
  --color-text-muted: #646774;
  --color-input-bg: rgba(227, 224, 217, 0.9);
  --color-glass: rgba(227, 224, 217, 0.3);
  --color-glass-card: rgba(255, 255, 255, 0.4);
  
}

* {
  box-sizing: border-box;
}
  
input, select, textarea {
  font-size: 16px;
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
  background-attachment: fixed;
  min-height: 100vh;
  overflow-x: hidden;
}

main {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.18);
  overflow-x: hidden;
}
`;