import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';




///create a new theme for MUI

const theme = createTheme({
  typography:{
    fontFamily:"Roboto slab,serif",
    allVariants: {color: "white"},
},
});




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
   
  </React.StrictMode>,
);
