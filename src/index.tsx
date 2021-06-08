import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2C363F;
    --pink: #E75A7C;
    --light-pink: #FFD6C0;
    --blue: #2D93AD;
    --green: #7AC74F;
    --white: #fef3f3;
  }

  * {
    box-sizing: border-box;
  }
  html {
    font-family: 'Balsamiq Sans', cursive;
    font-size: 10px;
  }
  body {
    background: var(--light-pink);
    color: var(--black);
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&display=swap" rel="stylesheet" /> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
