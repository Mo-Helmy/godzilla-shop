import { Pagination, Stack, Typography } from '@mui/material';
import React from 'react';
import ProductList from '../products/ProductList';

const ProductListPages = ({ products, pageCount, page, navigateTo }) => {
  return (
    <Stack gap={2} alignItems="center">
      <ProductList products={products} width={250} />
      <Stack alignSelf="center">
        <Typography>Page: {page}</Typography>
        <Pagination
          count={pageCount}
          page={+page}
          variant="outlined"
          color="primary"
          onChange={(e, v) => {
            navigateTo(v);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ProductListPages;
