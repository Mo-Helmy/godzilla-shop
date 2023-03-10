import ExpandMore from '@mui/icons-material/ExpandMore';
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
  Button,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrderDetails from '../addOrder/OrderDetails';

const orderStatus = ['pending', 'printing', 'delivering', 'delivered'];

const OrderItem = ({ order }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    order.status !== 'delivered' && setShowDetails(true);
  }, []);

  return (
    <Stack direction="column" gap={2} p={2} border="1px solid" borderRadius={1}>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography>Ordered at: {order.iat?.split('T')[0]}</Typography>

        <Stack direction="row" maxWidth="500px" alignItems="flex-start">
          <Button onClick={() => setShowStatus((prev) => !prev)}>
            {order.status?.toUpperCase()}
          </Button>
          <Collapse in={showStatus}>
            <Timeline sx={{ alignItems: 'flex-start' }}>
              {orderStatus.map((status, i) => (
                <TimelineItem key={i}>
                  <TimelineSeparator>
                    <TimelineDot
                      color={order.status === status ? 'success' : 'grey'}
                    />
                    {i !== orderStatus.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent
                    color={order.status === status ? 'success.main' : 'inherit'}
                  >
                    <Typography>{status.toUpperCase()}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Collapse>
        </Stack>
      </Stack>

      <Accordion
        expanded={showDetails}
        onChange={(e, isExpanded) => setShowDetails(isExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography px={1}>Order Details:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box border="1px solid" maxWidth="500px">
            <OrderDetails key={order._id} userOrder={order} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default OrderItem;
