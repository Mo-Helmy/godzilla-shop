import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const CartSummary = () => {
  const cartState = useSelector((state) => state.cart);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Paper sx={{ borderRadius: 0, width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        px={2}
      >
        <Typography component="div">Subtotal</Typography>
        <Typography component="div">{cartState.totalPrice}EGP</Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        px={2}
      >
        <Typography component="div">Shipping</Typography>
        <Typography component="div">40EGP</Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        px={2}
        // bgcolor="primary.main"
      >
        <Typography component="div" fontWeight="bold">
          Total
        </Typography>
        <Typography component="div" fontWeight="bold">
          {cartState.totalPrice + 40}EGP
        </Typography>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        sx={{ borderRadius: 0 }}
        color="secondary"
        onClick={() => router.push(`/${session.id}/add-order`)}
        disabled={cartState.items.length === 0}
      >
        Proceed To Checkout
      </Button>
    </Paper>
  );
};

export default CartSummary;
