// --- EXTERN IMPORTS ---
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.typography.fontFamily}; 
  }
  html, body {
  margin: 0;
  padding: 0;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, picture {
    max-width: 100%;
    display: block;
  }

  input, button, textarea, select {
    font: inherit;
  }
`;
