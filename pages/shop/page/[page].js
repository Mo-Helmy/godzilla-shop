import { Pagination, Stack, TablePagination, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CategoryPageComponent from '../../../components/categories/CategoryPageComponent';
import Layout from '../../../components/layout/Layout';
import ProductList from '../../../components/products/ProductList';
import { apiUrl } from '../../../util/link-config';

const ShopPageNum = ({ products, pageCount, productCount }) => {
  const router = useRouter();
  const [page, setPage] = useState(+router.query.page);
  console.log('🚀 ~ file: Num.js:6 ~ shopPageNum ~ router', router.query);

  return (
    <CategoryPageComponent
      products={products}
      pageCount={pageCount}
      navigateTo={(page) => router.push(`/shop/page/${page}`)}
      page={router.query.page}
      currentCategory="shop"
    />
  );
};

export default ShopPageNum;

export const getStaticPaths = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/products?page=1`);
    const data = await response.json();

    let pathArr = [];
    for (let i = 0; i < data.pageCount; i++) {
      pathArr.push({ params: { page: String(i + 1) } });
    }

    console.log('🚀 ~ file: [page].js:18 ~ getStaticPaths ~ pathArr', pathArr);
    return {
      paths: pathArr,
      fallback: 'blocking',
    };
  } catch (error) {
    console.log('🚀 ~ file: [page].js:50 ~ getStaticPaths ~ error', error);
    return {
      paths: [{ params: { page: '1' } }],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/products?page=${params.page || '1'}`
    );
    const data = await response.json();

    return {
      props: {
        products: data.products,
        pageCount: data.pageCount,
        productCount: data.productCount,
      },
    };
  } catch (error) {
    console.log('🚀 ~ file: [page].js:73 ~ getStaticProps ~ error', error);
    return {
      props: {
        products: [],
        pageCount: [],
        productCount: 0,
      },
    };
  }
};
