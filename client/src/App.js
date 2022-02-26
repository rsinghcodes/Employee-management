import React from 'react';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Routes, Route } from 'react-router-dom';

import Employees from './pages/Employees/Employees';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070F3',
      light: '#f3f3f6',
    },
    background: {
      default: '#f4f5fd',
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    width: '100%',
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
