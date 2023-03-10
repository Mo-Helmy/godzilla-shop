import { axiosApi } from '../../util/axiosInstance';
import ShopPageComponent from '../../components/shop/ShopPage';

const ShopPageIndex = ({ products, nextProducts, productCount }) => {
  return (
    <ShopPageComponent
      products={products}
      nextProducts={nextProducts}
      productCount={productCount}
    />
  );
};

export default ShopPageIndex;

export async function getServerSideProps({ req, query }) {
  try {
    const searchQuery = req.url.split('?')[1];
    const url = searchQuery ? `/api/products?&${searchQuery}` : '/api/products';

    const response = await axiosApi.get(url);

    return {
      props: {
        products: response.data.products,
        nextProducts: response.data.nextProducts,
        productCount: response.data.productCount,
      },
    };
  } catch (error) {
    console.log('🚀 ~ file: index.js:31 ~ getServerSideProps ~ error:', error);
    return {
      props: {
        products: [],
        nextProducts: [],
        productCount: 0,
      },
    };
  }
  // console.log(
  //   '🚀 ~ file: index.js:17 ~ getServerSideProps ~ req:',
  //   Object.keys(req)
  // );
  // console.log('🚀 ~ file: index.js:17 ~ getServerSideProps ~ req:', req.url);
  // console.log('🚀 ~ file: index.js:17 ~ getServerSideProps ~ query:', query);
  // try {
  //   if (query.showmore) {
  //     console.log(
  //       '================= query.showMore is definied ==============='
  //     );
  //     let searchQueryString = '?';
  //     Object.keys(query).map(
  //       (key, index) =>
  //         (searchQueryString +=
  //           index === 0 ? `${key}=${query[key]}` : `&${key}=${query[key]}`)
  //     );

  //     const response = await axiosApi.get(`/api/products${searchQueryString}`);
  //     const data = await response.data;

  //     return {
  //       props: {
  //         products: data.products,
  //         nextProducts: data.nextProducts,
  //         productCount: data.productCount,
  //       },
  //     };
  //   }

  //   const response = await axiosApi.get(`/api/products?showmore=1`);
  //   const data = await response.data;

  //   return {
  //     props: {
  //       products: data.products,
  //       nextProducts: data.nextProducts,
  //       productCount: data.productCount,
  //     },
  //   };
  // } catch (error) {
  //   console.log('🚀 ~ file: index.js:136 ~ getServerSideProps ~ error', error);
  //   return {
  //     props: {
  //       products: [],
  //       nextProducts: [],
  //       productCount: 0,
  //     },
  //   };
  // }
}
