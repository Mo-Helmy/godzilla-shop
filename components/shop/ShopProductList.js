import { Button, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import ProductList from '../products/ProductList';

const ShopProductList = ({
  productList,
  productCount,
  onShowMore,
  colorsFilter,
  width,
}) => {
  const elRef = useRef();
  console.log('🚀 ~ file: ShopProductList.js:13 ~ elRef:', elRef.current);
  return (
    <Stack
      gap={1}
      alignItems="center"
      width="100%"
      sx={{ overflowY: 'auto' }}
      onScroll={(e) => console.log('=======Scroll========')}
      ref={elRef}
    >
      <Typography component="div" fontWeight="bold" alignSelf="flex-end">
        Show 1 - {productList.length} Of {productCount}
      </Typography>
      <ProductList
        products={productList}
        colorsFilter={colorsFilter}
        width={width}
      />
      {productCount > productList.length ? (
        <Button variant="text" onClick={onShowMore} fullWidth>
          <Typography
            fontWeight="bold"
            component="div"
            height="24px"
            onScroll={(e) => {
              console.log(e.view);
              console.log('======SCROLL=========');
            }}
          >
            Show More ({productCount - productList.length}) Items
          </Typography>
        </Button>
      ) : (
        <Typography fontWeight="bold" color="text.secondary">
          No More Products to Show
        </Typography>
      )}
    </Stack>
  );
};

export default ShopProductList;
