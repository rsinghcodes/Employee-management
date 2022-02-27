import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router-dom';
// material
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
// Redux
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/authSlice';
// Pages
import Employees from './pages/Employees';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import NotFound from './pages/NotFound';
// component
import ErrorFallback from './components/ErrorFallback';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070F3',
      light: '#f3f3f6',
    },
    secondary: {
      main: '#e53935',
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
