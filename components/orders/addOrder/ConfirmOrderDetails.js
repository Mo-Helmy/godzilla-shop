import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressItem from './selectShippingAddress/AddressItem';
import CartList from '../../cart/CartList';
import { useDispatch } from 'react-redux';
import { snackbarActions } from '../../../store/snackbarSlice';
import { cartActions } from '../../../store/cartSlice';
import { useRouter } from 'next/router';
import { axiosApiAuth } from '../../../util/axiosInstance';
import OrderDetails from './OrderDetails';
import { ST } from 'next/dist/shared/lib/utils';

const ConfirmOrderDetails = ({ onBack, selectedAddress, session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const addOrderHandler = async () => {
    axiosApiAuth
      .post(`/api/orders/${session.id}`, {
        address: selectedAddress,
      })
      .then(() => {
        dispatch(cartActions.clearCart());
        dispatch(
          snackbarActions.openSnackbar({
            severity: 'success',
            message: 'Order added successfully',
          })
        );
        router.push(`/${session.id}/orders`);
      });
  };

  return (
    <Stack
      direction="column"
      gap={2}
      pb={2}
      maxWidth="1200px"
      // mx="auto"
      alignSelf="center"
    >
      <IconButton onClick={onBack} sx={{ width: 'fit-content' }}>
        <ArrowBackIcon />
      </IconButton>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
        <Box flexBasis="70%">
          <OrderDetails />
        </Box>
        <Box>
          <Typography variant="h5">Shipping Address</Typography>
          <AddressItem address={selectedAddress} />
        </Box>
      </Stack>
      <Button variant="contained" color="secondary" onClick={addOrderHandler}>
        Place Order
      </Button>
    </Stack>
  );
};

export default ConfirmOrderDetails;
