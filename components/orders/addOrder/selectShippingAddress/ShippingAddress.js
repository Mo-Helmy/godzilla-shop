import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { axiosApiAuth } from '../../../../util/axiosInstance';
import AddAddressFrom from './AddAddressFrom';
import AddressItem from './AddressItem';

const ShippingAddress = ({ onSelectAddress, userAddresses, session }) => {
  const [addresses, setAddresses] = useState(userAddresses);

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const userDataRes = await fetch('/api/get-token');
  //     const userData = await userDataRes.json();

  //     if (!userData.jwt) return;

  //     axiosInstance
  //       .get(`/api/users/${userData.user.id}/data`)
  //       .then((res) => res.data)
  //       .then((data) => {
  //         console.log('🚀 ~ file: Navigation.js:84 ~ .then ~ data', data);
  //         console.log(
  //           '🚀 ~ file: Navigation.js:84 ~ .then ~ data',
  //           data.userData.favorite
  //         );
  //         console.log(
  //           '🚀 ~ file: Navigation.js:84 ~ .then ~ data',
  //           data.userData.cart
  //         );

  //         setAddresses(data.userData.addresses || []);
  //       })
  //       .finally(() => setIsLoading(false));
  //   })();
  // }, []);

  const submitAddressHandler = async (address) => {
    const updatedAddresses = !addresses ? [address] : addresses.concat(address);

    axiosApiAuth
      .post(`/api/users/${session.id}/data`, {
        addresses: updatedAddresses,
      })
      .then((res) => {
        setAddresses(updatedAddresses);
        setShowAddAddressForm(false);
      });
  };

  const selectAddressHandler = (e, newValue) => {
    onSelectAddress(addresses[newValue]);
  };

  return (
    <Stack
      spacing={2}
      mt={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {!showAddAddressForm && (
        <>
          <Typography variant="h5" align="center">
            Select Your Shipping Address
          </Typography>
          {addresses.length > 0 ? (
            // <RadioGroup onChange={selectAddressHandler}>
            //   {addresses?.map((address, i) => (
            //     <FormControlLabel
            //       key={i}
            //       control={<Radio />}
            //       label={<AddressItem address={address} />}
            //       value={i}
            //       sx={{ marginBottom: 2 }}
            //     />
            //   ))}
            // </RadioGroup>
            <ToggleButtonGroup
              onChange={selectAddressHandler}
              orientation="vertical"
            >
              {addresses?.map((address, i) => (
                <ToggleButton key={`${i}`} value={i} fullWidth>
                  <AddressItem address={address} />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : (
            <Typography align="center">
              Please add your shipping address
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={() => setShowAddAddressForm(true)}
          >
            Add New Address
          </Button>
        </>
      )}

      {showAddAddressForm && (
        <AddAddressFrom
          onCancel={() => setShowAddAddressForm(false)}
          onSubmit={submitAddressHandler}
        />
      )}
    </Stack>
  );
};

export default ShippingAddress;
