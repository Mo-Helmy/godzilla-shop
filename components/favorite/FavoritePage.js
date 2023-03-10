import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosApi } from '../../util/axiosInstance';
import ProductListPages from '../categories/ProductListPages';
import PageLayout from '../layout/PageLayout';
import ProductListShowmore from '../shop/ProductListShowmore';
import Loading from '../UI/Loading';

const FavoritePageComponent = () => {
  const favoriteState = useSelector((state) => state.favorite);
  const [productList, setProductList] = useState([]);
  // const [nextProductList, setNextProductList] = useState([]);
  // const [productCount, setProductCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (favoriteState.isInitial) return;

    setIsLoading(true);

    axiosApi
      .get(
        `/api/products?product_id=${favoriteState.value.join()}&page=${
          router.query.page
        }`
      )
      .then((res) => {
        setProductList(res.data.products);
        // setNextProductList(res.data.nextProducts);
        // setProductCount(res.data.productCount);
        setPageCount(res.data.pageCount);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [favoriteState.value, router.query.page]);

  if (favoriteState.isInitial || isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      items={[
        { value: 'Shop', url: '/shop' },
        { value: 'Favorite', url: `/${session.id}/favorite` },
      ]}
    >
      {productList.length === 0 ? (
        <Typography align="center">Your favorite list is empety!</Typography>
      ) : (
        <ProductListPages
          products={productList}
          pageCount={pageCount}
          page={router.query.page || 1}
          navigateTo={(page) =>
            router.push(`/${session.id}/favorite?page=${page}`)
          }
        />
        // <ProductListShowmore
        //   products={productList}
        //   nextProducts={nextProductList}
        //   productCount={productCount}
        // />
      )}
    </PageLayout>
  );
};

export default FavoritePageComponent;
