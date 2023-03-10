import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Tab,
  Tabs,
  colors,
  IconButton,
  Slide,
  Fade,
} from '@mui/material';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { axiosApi } from '../../util/axiosInstance';
import ProductList from '../products/ProductList';
import ProductListSlider from './TshirtCategorySec/ProductListSlider';

const TshirtCategorySec = ({ products }) => {
  const [tabValue, setTabValue] = useState('NEW_ARRIVALE');

  const [isSlide, setIsSlide] = useState(true);

  const [newArrivaleProducts, setNewArrivaleProducts] = useState([]);
  console.log(
    '🚀 ~ file: TshirtCategorySec.js:54 ~ TshirtCategorySec ~ newArrivaleProducts:',
    newArrivaleProducts
  );
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    axiosApi
      .get('/api/products?page=1&type=tshirt')
      .then((res) => {
        setNewArrivaleProducts(res.data.products);
      })
      .catch((err) => console.log(err));
    axiosApi
      .get('/api/products?page=2&type=tshirt')
      .then((res) => {
        setFeaturedProducts(res.data.products);
      })
      .catch((err) => console.log(err));
    axiosApi
      .get('/api/products')
      .then((res) => {
        setPopularProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      gap={4}
      width="100%"
      // height="90vh"
      minHeight="90vh"
      py={4}
    >
      <Box
        flexGrow={1}
        minWidth="20%"
        minHeight="50vh"
        flexBasis="20%"
        sx={{
          backgroundImage: 'url(img/large-white-tshirt.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            bgcolor="#ffffff54"
            borderRadius={4}
            px={1}
            mb={1}
          >
            T-Shirt
          </Typography>
          <Link href="/shop/category/tshirt/1">
            <Button
              sx={{
                fontWeight: 'bolder',
              }}
              variant="contained"
              color="primary"
            >
              Discover More
            </Button>
            <Divider />
          </Link>
        </Box>
      </Box>
      <Box flexGrow={1} overflow="hidden">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            // aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="New Arrivale" value="NEW_ARRIVALE" />
            <Tab label="Featured" value="FEATURED" />
            <Tab label="Popular" value="POPULAR" />
          </Tabs>
        </Box>
        {tabValue === 'NEW_ARRIVALE' ? (
          <ProductListSlider products={newArrivaleProducts} />
        ) : tabValue === 'FEATURED' ? (
          <ProductListSlider products={featuredProducts} />
        ) : (
          tabValue === 'POPULAR' && (
            <ProductListSlider products={popularProducts} />
          )
        )}
      </Box>
    </Stack>
  );
};

export default TshirtCategorySec;
