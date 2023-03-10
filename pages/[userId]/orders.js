import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import React from 'react';
import OrdersPageComponent from '../../components/orders/ordersPage/OrdersPage';
import { axiosApi } from '../../util/axiosInstance';
import { authOptions } from '../api/auth/[...nextauth]';

const OrdersPage = ({ orders }) => {
  return <OrdersPageComponent orders={orders} />;
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

  try {
    const token = await getToken({ req, raw: true });
    const response = await axiosApi.get(`/api/orders/${query.userId}`, {
      headers: { Authorization: token },
    });

    return {
      props: { session, orders: response.data.orders },
    };
  } catch (error) {
    return {
      props: { session, orders: [] },
    };
  }
};

export default OrdersPage;
