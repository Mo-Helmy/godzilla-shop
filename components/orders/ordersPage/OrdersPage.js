import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import PageLayout from '../../layout/PageLayout';
import OrderItem from './OrderItem';

const orderStatus = ['pending', 'printing', 'delivering', 'delivered'];

const OrdersPageComponent = ({ orders }) => {
  const { data: session } = useSession();
  return (
    <PageLayout
      items={[
        { value: 'Shop', url: '/shop' },
        { value: 'Orders', url: `/${session.id}/orders` },
      ]}
    >
      <Stack gap={2} width="fit-content" alignSelf="center">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem order={order} key={order._id} />)
        ) : (
          <Typography>Order List is Empty!</Typography>
        )}
      </Stack>
    </PageLayout>
  );
};

export default OrdersPageComponent;
