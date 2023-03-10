import { Button, Collapse, Paper, Stack, useMediaQuery } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../layout/PageLayout';
import ShopFilter from './ShopFilter';
import ShopProductList from './ShopProductList';
import ProductListShowmore from './ProductListShowmore';

const ShopPageComponent = ({ products, nextProducts, productCount }) => {
  // const [productList, setProductList] = useState([]);
  // const [nextProductList, setNextProductList] = useState([]);

  // const router = useRouter();
  // const page = router.query.page || '1';
  // const searchQuery = router.asPath.split('?')[1];

  // const isSmallMedia = useMediaQuery('(max-width:895px)');
  // const [isExpanded, setIsExpanded] = useState(false);

  // const [colorsFilter, setColorsFilter] = useState([]);

  // useEffect(() => {
  //   if (page === '1') setProductList(products);

  //   setNextProductList(nextProducts);
  // }, [products, nextProducts]);

  // const showmoreHandler = () => {
  //   const updatedSearchQuery = searchQuery?.includes(`page=${page}`)
  //     ? `?${searchQuery.replace(`page=${page}`, `page=${+page + 1}`)}`
  //     : '?page=2';
  //   console.log(
  //     '🚀 ~ file: ShopPage.js:48 ~ showmoreHandler ~ updatedSearchQuery:',
  //     updatedSearchQuery
  //   );

  //   router.push(`/shop${updatedSearchQuery}`, `/shop${updatedSearchQuery}`, {
  //     scroll: false,
  //   });

  //   setProductList((prev) => prev.concat(nextProductList));

  //   // if (router.query.showmore) {
  //   //   let searchQueryString = `?showmore=${+router.query.showmore + 1}`;
  //   //   Object.keys(router.query).map(
  //   //     (key) =>
  //   //       key !== 'showmore' &&
  //   //       (searchQueryString += `&${key}=${router.query[key]}`)
  //   //   );
  //   //   router.push(`/shop${searchQueryString}`, `/shop${searchQueryString}`, {
  //   //     scroll: false,
  //   //   });
  //   // } else {
  //   //   router.push(`/shop?showmore=2`, `/shop?showmore=2`, { scroll: false });
  //   // }

  //   // setProductList(nextProductList);
  // };

  // const searchHandler = (searchQuery) => {
  //   if (searchQuery.color) {
  //     setColorsFilter(searchQuery.color);
  //   }

  //   let searchQueryString = `?page=1`;
  //   Object.keys(searchQuery).map(
  //     (key) =>
  //       searchQuery[key] && (searchQueryString += `&${key}=${searchQuery[key]}`)
  //   );
  //   router.push(`/shop${searchQueryString}`);
  // };

  // return (
  //   <PageLayout items={[{ value: 'Shop', url: '/shop' }]}>
  //     <Stack direction={{ xs: 'column', md: 'row' }} gap={1} py={2}>
  //       <Paper
  //         sx={{
  //           display: 'flex',
  //           alignItems: 'flex-start',
  //           alignSelf: 'flex-start',
  //         }}
  //       >
  //         <Button onClick={() => setIsExpanded((prev) => !prev)}>
  //           <TuneIcon />
  //         </Button>
  //         <Collapse
  //           in={isExpanded}
  //           orientation="horizontal"
  //           mountOnEnter
  //           unmountOnExit
  //         >
  //           <ShopFilter
  //             onSearch={searchHandler}
  //             onClose={() => setIsExpanded(false)}
  //           />
  //         </Collapse>
  //       </Paper>
  //       <ShopProductList
  //         productList={productList}
  //         productCount={productCount}
  //         onShowMore={showmoreHandler}
  //         colorsFilter={colorsFilter}
  //         width={250}
  //       />
  //     </Stack>
  //   </PageLayout>
  // );

  return (
    <PageLayout items={[{ value: 'Shop', url: '/shop' }]}>
      <ProductListShowmore
        products={products}
        nextProducts={nextProducts}
        productCount={productCount}
      />
    </PageLayout>
  );
};

export default ShopPageComponent;
