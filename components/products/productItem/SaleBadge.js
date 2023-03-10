import { Typography } from '@mui/material';
import React from 'react';

const SaleBadge = ({ price, discount }) => {
  const salePercent = Math.ceil(((price - discount) / price) * 100);
  return (
    <Typography
      bgcolor="#f44336"
      component="div"
      variant="body2"
      px={1}
      py={0.5}
      width="fit-content"
      color="whitesmoke"
      // sx={{ transform: 'translateY(-100%)' }}
      sx={{
        position: 'absolute',
        top: '32px',
        left: 0,
      }}
    >
      Sale {salePercent}%
    </Typography>
  );
};

export default SaleBadge;
