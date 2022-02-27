import React from 'react';
import { Avatar, Container, Typography, Box } from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const NotFound = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FindInPageIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
