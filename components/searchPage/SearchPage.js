import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { axiosApi } from '../../util/axiosInstance';
import ProductListPages from '../categories/ProductListPages';
import Search from '../layout/navigationUpper/Search';
import PageLayout from '../layout/PageLayout';

const SearchPageComponent = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const searchValue = router.query.search;
  const category = router.query.type;

  useEffect(() => {
    if (!searchValue) return;

    const url = category
      ? `/api/products?search=${searchValue.trim()}&type=${category}`
      : `/api/products?search=${searchValue.trim()}`;
    axiosApi.get(url).then((res) => {
      setProducts(res.data.products);
      setPageCount(res.data.pageCount);
    });
  }, [searchValue, category]);

  const navigateTo = (page) => {
    const url = category
      ? `/shop/search?search=${searchValue.trim()}&page=${page}&type=${category}`
      : `/shop/search?search=${searchValue.trim()}&page=${page}`;
    router.push(url);
  };

  return (
    <PageLayout items={[{ value: 'Shop', url: '/shop' }, { value: 'Search' }]}>
      {/* <Stack> */}
      <Box alignSelf="flex-end">
        <Search />
      </Box>
      <ProductListPages
        products={products}
        pageCount={pageCount}
        page={router.query.page || 1}
        navigateTo={navigateTo}
      />
      {/* </Stack> */}
    </PageLayout>
  );
};

export default SearchPageComponent;
