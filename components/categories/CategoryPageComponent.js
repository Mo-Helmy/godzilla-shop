import { Pagination, Stack, Typography } from '@mui/material';
import PageLayout from '../layout/PageLayout';
import ProductList from '../products/ProductList';
import ProductListPages from './ProductListPages';

const CategoryPageComponent = ({
  products,
  pageCount,
  page,
  navigateTo,
  currentCategory,
}) => {
  return (
    <PageLayout
      items={[
        { value: 'Shop', url: '/shop' },
        { value: currentCategory, url: `/shop/category/${currentCategory}/1` },
      ]}
    >
      <ProductListPages
        products={products}
        pageCount={pageCount}
        page={page}
        navigateTo={navigateTo}
      />
    </PageLayout>
  );
};

export default CategoryPageComponent;
