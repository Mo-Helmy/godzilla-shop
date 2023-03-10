import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';

const AddressItem = ({ address }) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      <Typography variant="h6">{address.fullname}</Typography>
      <Divider />
      <Typography>
        {address.street}, {address.building}, {address.floor},{' '}
        {address.landmark}
      </Typography>
      <Divider />
      <Typography>
        {address.area}, {address.city}
      </Typography>
      <Divider />
      <Typography>{address.mobile}</Typography>
    </Paper>
  );
};

export default AddressItem;
