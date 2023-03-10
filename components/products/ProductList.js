import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import ProductDetails from './ProductDetails';

import ProductItem from './ProductItem';
import { useSession } from 'next-auth/react';

const ProductList = ({ products, colorsFilter, width, noWrap }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: session } = useSession();

  const SelectedProductHandler = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };
  return (
    <>
      <Stack
        direction="row"
        // overflow={{ xs: 'auto', sm: 'hidden' }}
        gap={2}
        // py={2}
        px={1}
        flexWrap={noWrap ? 'no-wrap' : 'wrap'}
        // flexWrap={{ sm: 'wrap' }}
        // alignItems="center"
        alignContent="stretch"
        justifyContent="center"
        // justifyContent="flex-start"
        // overflow="auto"
        // sx={{ opacity: opacity,  }}
      >
        {products &&
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              colorsFilter={colorsFilter}
              onSelectProduct={SelectedProductHandler}
              session={session}
              width={width}
            />
          ))}
      </Stack>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        // sx={{ width: { xs: 400, md: 800 } }}
        // sx={{ width: 'fit-content', maxWidth: 'fit-content' }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogActions>
          <IconButton
            size="large"
            color="info"
            onClick={() => {
              setOpenDialog(false);
              // setSelectedProduct(null);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <ProductDetails product={selectedProduct} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductList;
