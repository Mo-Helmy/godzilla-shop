import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { s3Url } from '../../../util/link-config';
import { useRouter } from 'next/router';
import { cartActions } from '../../../store/cartSlice';
import Link from 'next/link';

const CartNavIcon = () => {
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const cartState = useSelector((state) => state.cart);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  return (
    <>
      <IconButton onClick={(e) => setCartAnchorEl(e.currentTarget)}>
        <Badge badgeContent={cartState.totalQuantity} color="primary">
          <LocalMallOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        open={Boolean(cartAnchorEl)}
        anchorEl={cartAnchorEl}
        onClose={() => setCartAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Stack px={2}>
          {cartState.items.length === 0 ? (
            <Typography px={2} py={2}>
              Cart is Empty!
            </Typography>
          ) : (
            cartState.items.map((item, index) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                py={1}
                gap={2}
                key={item.id + index}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Link
                    href={`/shop/${item.id}`}
                    onClick={() => setCartAnchorEl(null)}
                  >
                    <Image
                      src={s3Url + item.colorUrl}
                      alt="#"
                      width={80}
                      height={80}
                    />
                  </Link>
                  <Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography color="secondary.main">
                        {item.price}EGP
                      </Typography>
                      <CloseOutlinedIcon
                        fontSize="small"
                        sx={{ color: 'secondary.main' }}
                      />
                      <Typography color="secondary.main">
                        {item.quantity}
                      </Typography>
                    </Stack>
                    <Typography fontFamily="serif" maxWidth={200}>
                      <Link
                        href={`/shop/${item.id}`}
                        onClick={() => setCartAnchorEl(null)}
                      >
                        {item.title.toUpperCase()} - {item.size.toUpperCase()}
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
                <IconButton
                  onClick={() => dispatch(cartActions.removeFromCart(item))}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Stack>
            ))
          )}
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            // px={2}
            py={2}
          >
            <Typography color="secondary.main">Total:</Typography>
            <Typography color="secondary.main">
              {cartState.totalPrice} EGP
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mb: '8px', borderRadius: 0 }}
            onClick={() => {
              router.push(`/${session.id}/cart`);
              setCartAnchorEl(null);
            }}
          >
            VIEW CART
          </Button>

          <Button
            variant="contained"
            sx={{ mb: '8px', borderRadius: 0 }}
            onClick={() => {
              router.push(
                cartState.totalQuantity > 0
                  ? `/${session.id}/add-order`
                  : '/shop'
              );
              setCartAnchorEl(null);
            }}
          >
            {cartState.totalQuantity > 0 ? 'CHECKOUT' : 'Continue Shopping'}
          </Button>
        </Stack>
      </Menu>
    </>
  );
};

export default CartNavIcon;
