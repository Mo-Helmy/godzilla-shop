import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { s3Url } from '../../util/link-config';

const CartItem1 = ({ item, xsMedia }) => {
  const dispatch = useDispatch();
  return (
    <Grid
      container
      borderBottom={'1px solid'}
      borderColor="GrayText"
      alignItems="center"
      py={1}
    >
      <Grid item xs={xsMedia ? 4 : 3} alignItems="center">
        <Stack direction="row" justifyContent="center">
          <Image
            src={s3Url + item.colorUrl}
            alt={item.title + '-' + item.color}
            width={100}
            height={100}
          />
        </Stack>
      </Grid>
      <Grid item xs={xsMedia ? 4 : 3}>
        <Box>
          <Typography component="div" fontWeight="bold" fontFamily="sans-serif">
            {item.title} - {item.size}
          </Typography>
          <Typography
            component="div"
            fontWeight="bold"
            fontFamily="sans-serif"
            color="GrayText"
          >
            {item.price} EGP
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={xsMedia ? 4 : 3}>
        <Stack direction="row" justifyContent="center">
          <ButtonGroup
            size="small"
            sx={{ '&.MuiButtonGroup-grouped': { minWidth: '20px' } }}
          >
            <Button
              size="small"
              onClick={() => {
                dispatch(
                  cartActions.removeFromCart({
                    ...item,
                    quantity: 1,
                    itemToltalPrice: item.price,
                  })
                );
                dispatch(cartActions.resetProcess());
              }}
            >
              -
            </Button>
            <Button sx={{ color: 'inherit' }}>{item.quantity}</Button>
            <Button
              size="small"
              onClick={() => {
                dispatch(
                  cartActions.addToCart({
                    ...item,
                    quantity: 1,
                    itemToltalPrice: item.price,
                  })
                );
                dispatch(cartActions.resetProcess());
              }}
            >
              +
            </Button>
          </ButtonGroup>
        </Stack>
      </Grid>
      {!xsMedia && (
        <Grid item xs={3}>
          <Typography
            component="div"
            align="center"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {item.itemToltalPrice} EGP
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CartItem1;
