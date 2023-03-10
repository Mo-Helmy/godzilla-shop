import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import CategoryPageComponent from '../../../../components/categories/CategoryPageComponent';
import Layout from '../../../../components/layout/Layout';
import { axiosApi } from '../../../../util/axiosInstance';

const TshirtCategoryPage = ({ products, pageCount }) => {
  const router = useRouter();
  return (
    <CategoryPageComponent
      products={products}
      pageCount={pageCount}
      page={router.query.page || 1}
      navigateTo={(page) =>
        router.push(`/shop/category/${router.query.category}/${page}`)
      }
      currentCategory={router.query.category}
    />
  );
};

export default TshirtCategoryPage;

export const getStaticPaths = async () => {
  const categories = ['tshirt', 'hoodie', 'tableu'];
  try {
    let pathArr = [];

    for (let cat of categories) {
      let response = await axiosApi.get(`/api/products?page=1&type=${cat}`);
      let pageCount = +response.data.pageCount;
      for (let i = 0; i < pageCount; i++) {
        pathArr.push({ params: { category: cat, page: String(i + 1) } });
      }
    }

    console.log(
      '🚀 ~ file: tshirt/[page].js:21 ~ getStaticPaths ~ pathArr:',
      pathArr
    );
    return {
      paths: pathArr,
      fallback: false,
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: tshirt/[page].js:31 ~ getStaticPaths ~ error:',
      error
    );
    return {
      paths: [{ params: { category: 'tshirt', page: '1' } }],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params }) => {
  console.log(
    '🚀 ~ file: tshirt/[page].js:17 ~ getStaticProps ~ params:',
    params
  );

  try {
    const response = await axiosApi.get(
      `/api/products?page=${params.page}&type=${params.category}`
    );
    console.log(
      '🚀 ~ file: category/[page].js:79 ~ getStaticProps ~ response.data:',
      response.data
    );

    return {
      props: {
        products: response.data.products,
        productCount: response.data.productCount,
        pageCount: response.data.pageCount,
      },
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: tshirt/[page].js:73 ~ getStaticProps ~ error',
      error
    );
    return {
      props: {
        products: [],
        pageCount: 1,
        productCount: 0,
      },
    };
  }
};
