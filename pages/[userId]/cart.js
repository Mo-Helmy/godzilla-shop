import { getServerSession } from 'next-auth';
import React from 'react';
import CartPageComponent from '../../components/cart/CartPage';
import { authOptions } from '../api/auth/[...nextauth]';

const CartPage = ({ session }) => {
  return <CartPageComponent />;
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: '/auth/login',
        permenant: false,
      },
    };

  const isAutherized = session?.id === query.userId;

  if (!isAutherized)
    return {
      redirect: {
        destination: '/',
        permenant: false,
      },
    };

  return {
    props: { session },
  };
};

export default CartPage;
