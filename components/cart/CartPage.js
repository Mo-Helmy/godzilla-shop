import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../UI/Loading';
import CartList1 from './CartList1';
import CartSummary from './CartSummary';
import CartCouponCode from './CartCouponCode';
import PageLayout from '../layout/PageLayout';

const CartPageComponent = () => {
  const cartState = useSelector((state) => state.cart);

  if (cartState.isInitial) {
    return <Loading />;
  }

  return (
    <PageLayout items={[{ value: 'Shop', url: '/shop' }, { value: 'Cart' }]}>
      <Stack direction={{ xs: 'column', md: 'row' }} width="100%" gap={2}>
        <CartList1 items={cartState.items} />
        <Stack flexBasis="30%" alignItems="center" gap={4} py={2}>
          <CartCouponCode />
          <CartSummary />
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default CartPageComponent;
