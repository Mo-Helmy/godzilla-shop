import { Divider, Stack } from '@mui/material';
import React from 'react';
import PageLayout from '../layout/PageLayout';
import ProductDetails from './ProductDetails';
import RelatedProducts from './ProductDetails/RelatedProducts';

const ProductDetailsPageComponent = ({ product }) => {
  return (
    <PageLayout
      items={[
        { value: 'Shop', url: '/shop' },
        { value: product.type, url: `/shop/category/${product.type}/1` },
        { value: product.title },
      ]}
    >
      <Stack gap={2}>
        <ProductDetails product={product} />
        <Divider />
        <RelatedProducts
          type={product.type}
          tags={product.tags}
          excludeId={product._id}
        />
      </Stack>
    </PageLayout>
  );
};

export default ProductDetailsPageComponent;
