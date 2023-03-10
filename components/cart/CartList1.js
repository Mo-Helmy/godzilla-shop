import { Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CartItem1 from './CartItem1';

const CartList1 = ({ items }) => {
  const xsMedia = useMediaQuery('(max-width:600px)');

  return (
    <Stack direction="column" gap={2} flexBasis="70%">
      {items.length > 0 ? (
        <Grid
          container
          borderTop="1px solid"
          borderRight="1px solid"
          borderLeft="1px solid"
          borderColor="GrayText"
          pt={1}
        >
          <Grid
            container
            borderBottom="1px solid"
            borderColor="GrayText"
            alignItems="center"
            py={1}
          >
            <Grid item xs={xsMedia ? 4 : 3}>
              <Typography
                component="div"
                align="center"
                fontWeight="bold"
                fontFamily="sans-serif"
                color="GrayText"
              >
                Image
              </Typography>
            </Grid>
            <Grid item xs={xsMedia ? 4 : 3}>
              <Typography
                component="div"
                fontWeight="bold"
                fontFamily="sans-serif"
                color="GrayText"
              >
                Product Details
              </Typography>
            </Grid>
            <Grid item xs={xsMedia ? 4 : 3}>
              <Typography
                component="div"
                align="center"
                fontWeight="bold"
                fontFamily="sans-serif"
                color="GrayText"
              >
                Quantity
              </Typography>
            </Grid>
            {!xsMedia && (
              <Grid item xs={3}>
                <Typography
                  component="div"
                  align="center"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  color="GrayText"
                >
                  Total
                </Typography>
              </Grid>
            )}
          </Grid>
          {items.map((item, index) => (
            <CartItem1 item={item} xsMedia={xsMedia} key={item.id + index} />
          ))}
        </Grid>
      ) : (
        <Typography align="center"> Cart is Empty!</Typography>
      )}
      <Grid container py={1} justifyContent="flex-end">
        <Grid item xs={7} sm={4}>
          <Link href="/shop">
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ borderRadius: 0 }}
            >
              Continue Shopping
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <Stack direction="row" justifyContent="flex-start"></Stack> */}
    </Stack>
  );
};

export default CartList1;
