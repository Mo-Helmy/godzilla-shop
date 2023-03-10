import { Button, Collapse, Paper, Stack } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ShopFilter from './ShopFilter';
import ShopProductList from './ShopProductList';

const ProductListShowmore = ({ products, nextProducts, productCount }) => {
  const [productList, setProductList] = useState([]);
  const [nextProductList, setNextProductList] = useState([]);

  const [colorsFilter, setColorsFilter] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();
  const page = router.query.page || '1';
  const searchQuery = router.asPath.split('?')[1];
  const asPath = router.asPath;

  useEffect(() => {
    if (page === '1') setProductList(products);
    setNextProductList(nextProducts);
  }, [products, nextProducts]);

  const showmoreHandler = (e) => {
    const updatedAsPath = asPath?.includes(`page=${page}`)
      ? `${asPath.replace(`page=${page}`, `page=${+page + 1}`)}`
      : asPath.concat('?page=2');

    router.push(updatedAsPath, updatedAsPath, {
      scroll: false,
    });

    setProductList((prev) => prev.concat(nextProductList));
  };

  const searchHandler = (searchQuery) => {
    if (searchQuery.color) setColorsFilter(searchQuery.color);

    let searchQueryString = `?page=1`;
    Object.keys(searchQuery).map(
      (key) =>
        searchQuery[key] && (searchQueryString += `&${key}=${searchQuery[key]}`)
    );

    router.push(`/shop${searchQueryString}`);
  };

  return (
    <Stack direction={{ xs: 'row', md: 'row' }} gap={1} py={2}>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
        }}
      >
        <Button onClick={() => setIsExpanded((prev) => !prev)}>
          <TuneIcon />
        </Button>
        <Collapse
          in={isExpanded}
          orientation="horizontal"
          mountOnEnter
          //   unmountOnExit
        >
          <ShopFilter
            onSearch={searchHandler}
            onClose={() => setIsExpanded(false)}
          />
        </Collapse>
      </Paper>
      <ShopProductList
        productList={productList}
        productCount={productCount}
        onShowMore={showmoreHandler}
        colorsFilter={colorsFilter}
        width={250}
      />
    </Stack>
  );
};

export default ProductListShowmore;
