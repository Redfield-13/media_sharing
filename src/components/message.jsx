import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  return (
    <Stack sx={{ alignItems:'center', margin:'auto',width: '60%' }} spacing={2}>
      <Alert sx={{margin:'auto'}} severity="error">{props.message}</Alert>
    </Stack>
  );
}