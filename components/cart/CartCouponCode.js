import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const CartCouponCode = () => {
  return (
    <Box height={56}>
      <TextField
        placeholder="Coupon Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" sx={{ height: '54px', mr: '-14px' }}>
                APPLY
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CartCouponCode;
