import { Breadcrumbs, Divider, Stack, Typography } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import React from 'react';
import Link from 'next/link';

const BreadCrumbsComponent = ({ items }) => {
  return (
    <>
      <Breadcrumbs sx={{ borderBottom: '0.8px solid', borderColor: 'divider' }}>
        <Link href="/">
          <Stack direction="row" alignItems="center">
            <HomeSharpIcon />
            <Typography>Home</Typography>
          </Stack>
        </Link>
        {items.map((item, index, arr) => {
          if (index < arr.length - 1) {
            return (
              <Link key={item.value + index} href={item.url}>
                {item.value}
              </Link>
            );
          } else {
            return (
              <Typography key={item.value + index}>{item.value}</Typography>
            );
          }
        })}
        {/* <Typography>Cart</Typography> */}
      </Breadcrumbs>
      {/* <Divider orientation="horizontal" /> */}
    </>
  );
};

export default BreadCrumbsComponent;
