import { IconButton, Stack, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';
import ProductList from '../../products/ProductList';

const ProductListSlider = ({ products, autoScroll }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  //   const [autoScrollInterval, setAutoScrollInterval] = useState(0);
  console.log(
    '🚀 ~ file: productListSlider.js:9 ~ ProductListSlider ~ activeIndex:',
    activeIndex
  );

  const xs = useMediaQuery('(max-width:600px)');
  const sm = useMediaQuery('(max-width:900px)');
  const md = useMediaQuery('(max-width:1200px)');
  console.log(
    '🚀 ~ file: productListSlider.js:18 ~ ProductListSlider ~ md:',
    md
  );
  console.log(
    '🚀 ~ file: productListSlider.js:17 ~ ProductListSlider ~ sm:',
    sm
  );
  console.log(
    '🚀 ~ file: productListSlider.js:20 ~ ProductListSlider ~ xs:',
    xs
  );

  const productCountShown = xs ? 1 : sm ? 2 : md ? 3 : 3;
  console.log(
    '🚀 ~ file: productListSlider.js:32 ~ ProductListSlider ~ productCountShown:',
    productCountShown
  );

  //   useEffect(() => {
  //     // if (!autoScroll) return;
  //     console.log('============useEffect==============');
  //     const timeout = setTimeout(() => {
  //       setActiveIndex((prev) => (prev + 1) % (products.length - (3 - 1)));
  //     }, 5000);
  //     console.log(
  //       '🚀 ~ file: productListSlider.js:17 ~ interval ~ interval:',
  //       timeout
  //     );

  //     return () => clearTimeout(timeout);
  //   }, [activeIndex]);

  const translateOffset = -266 * activeIndex;
  const forwardHandler = () => {
    setActiveIndex(
      (prev) => (prev + 1) % (products.length - (productCountShown - 1))
    );
  };
  const backHandler = () => {
    if (activeIndex === 0) return;
    setActiveIndex(
      (prev) => (prev - 1) % (products.length - (productCountShown - 1))
    );
  };

  return (
    <Stack direction="row" gap={1} alignItems="center" justifyContent="center">
      <IconButton onClick={backHandler} disabled={activeIndex === 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <Stack
        // className="productList-1"
        direction="row"
        overflow="hidden"
        maxWidth={xs ? '266px' : sm ? '532px' : md ? '798px' : '798px'}
      >
        <Stack
          // className="productList-2"
          direction={'row'}
          // gap={2}
          justifyContent="flex-start"
          sx={{
            transform: `translateX(${translateOffset}px)`,
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <ProductList products={products} noWrap width={250} />
        </Stack>
      </Stack>
      <IconButton onClick={forwardHandler}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  );
};

export default ProductListSlider;
