import ProductDetailsPageComponent from '../../components/products/ProductDetailsPage';
import axiosInstance from '../../util/axiosInstance';

const ProductPage = ({ product }) => {
  return <ProductDetailsPageComponent product={product} />;
};

export default ProductPage;

export async function getStaticPaths() {
  try {
    const response = await axiosInstance.get('/api/products');
    console.log(
      '🚀 ~ file: [productId].js:15 ~ getStaticPaths ~ response',
      response.data
    );

    return {
      paths: response.data.products.map((p) => ({
        params: { productId: p._id.toString() },
      })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.log('🚀 ~ file: [productId].js:23 ~ getStaticPaths ~ error', error);
    // throw new error(error);
    return {
      paths: [{ params: { productId: 'dd' } }],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await axiosInstance.get(
      `/api/products/${params.productId}`
    );

    console.log(response.data.product);

    return {
      props: {
        product: response.data.product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      props: {
        product: {},
      },
    };
  }
}
