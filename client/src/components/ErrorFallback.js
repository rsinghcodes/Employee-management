import { Box } from '@mui/material';

export default function ErrorFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <p>Something went wrong!</p>
      <pre>Please refresh page</pre>
    </Box>
  );
}
