import { Stack } from '@mui/material';
import React from 'react';
import BreadCrumbsComponent from '../UI/BreadCrumbs';

const PageLayout = (props) => {
  return (
    <Stack direction="column" gap={2} py={2}>
      <BreadCrumbsComponent items={props.items} />
      {props.children}
    </Stack>
  );
};

export default PageLayout;
