import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { s3Url } from '../../../util/link-config';

const OrderDetails = ({ userOrder }) => {
  const cartState = useSelector((state) => state.cart);

  const order = userOrder ? userOrder : cartState;

  return (
    <Paper sx={{ width: '100%', p: 2, borderRadius: 0 }}>
      <Stack>
        <Stack direction="row" px={2} py={1} gap={1}>
          <Typography component="div" fontWeight="bold" flexGrow={1} pl={2}>
            PRODUCT
          </Typography>
          <Typography component="div" fontWeight="bold" align="center">
            TOTAL
          </Typography>
        </Stack>
        <Divider />
        {order.items.map((item, index) => (
          <Box key={item.id + index}>
            <Stack direction="row" px={2} py={1} alignItems="center" gap={1}>
              <Stack direction="row" gap={1} alignItems="center" flexGrow={1}>
                <Image
                  src={s3Url + item.colorUrl}
                  alt={item.title + '-' + item.color}
                  width={70}
                  height={70}
                />
                <Typography component="div" fontWeight="bold">
                  {item.title} - {item.size} X {item.quantity}
                </Typography>
              </Stack>
              <Typography component="div" fontWeight="bold" align="center">
                {item.itemToltalPrice}EGP
              </Typography>
            </Stack>
            <Divider />
          </Box>
        ))}
        <Stack direction="row" px={2} py={1} gap={1}>
          <Typography component="div" flexGrow={1} pl={2}>
            Subtotal
          </Typography>
          <Typography component="div" align="center" color="secondary.main">
            {userOrder ? order.cartTotalPrice : order.totalPrice}EGP
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" px={2} py={1} gap={1}>
          <Typography component="div" flexGrow={1} pl={2}>
            Shipping
          </Typography>
          <Typography component="div" align="center" color="secondary.main">
            40EGP
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" px={2} py={1} color="secondary.main" gap={1}>
          <Typography component="div" fontWeight="bold" flexGrow={1} pl={2}>
            Total
          </Typography>
          <Typography component="div" fontWeight="bold" align="center">
            {userOrder ? order.totalPrice : order.totalPrice + 40}EGP
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OrderDetails;
