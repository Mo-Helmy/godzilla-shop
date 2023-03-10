import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
// import {
//   FavoriteBorderIcon,
//   FavoriteIcon,
//   VisibilityIcon,
// } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../store/favoriteSlice';
import { snackbarActions } from '../../store/snackbarSlice';
import { apiUrl, s3Url } from '../../util/link-config';
import ProductItemImageList from './productItem/ProductItemImageList';
import SaleBadge from './productItem/SaleBadge';

const ProductItem = ({
  product,
  colorsFilter,
  onSelectProduct,
  session,
  width,
}) => {
  const [mainImage, setMainImage] = useState(null);
  const [showImageList, setShowImageList] = useState(true);
  const router = useRouter();
  const favorite = useSelector((state) => state.favorite.value);

  const dispatch = useDispatch();

  let filteredMainImage = null;

  if (colorsFilter?.length > 0) {
    const filteredColorIndex = product?.colors.findIndex(
      (color) => color === colorsFilter[0]
    );

    filteredMainImage = product?.imagesUrl[filteredColorIndex];
  }

  const toggleFavoriteHandler = async () => {
    if (!session) {
      dispatch(
        snackbarActions.openSnackbar({
          severity: 'info',
          message: 'Please login to add items to favorite',
        })
      );
      return;
    }

    if (favorite.includes(product._id)) {
      dispatch(favoriteActions.removeFormFavorite(product._id));
    } else {
      dispatch(favoriteActions.addToFavorite(product._id));
    }
  };

  return (
    <Card
      // onMouseEnter={() => setShowImageList(true)}
      // onMouseLeave={() => setShowImageList(false)}
      sx={{ width: width || 350 }}
    >
      <Box position="relative">
        <Link href={`/shop/${product._id}`}>
          <CardMedia
            component="img"
            width="100%"
            height={width || 350}
            image={
              s3Url + (mainImage || filteredMainImage || product?.imagesUrl[0])
            }
          />
        </Link>

        {product.discount && (
          <SaleBadge price={product.price} discount={product.discount} />
        )}
        <IconButton
          color="primary"
          sx={{
            bgcolor: 'background.default',
            '&:hover': { color: 'primary.dark', bgcolor: 'background.default' },
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            zIndex: 20,
          }}
          onClick={toggleFavoriteHandler}
        >
          {favorite.includes(product._id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            bgcolor: 'background.default',
            '&:hover': { color: 'primary.dark', bgcolor: 'background.default' },
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            zIndex: 20,
          }}
          onClick={() => onSelectProduct(product)}
        >
          <LocalMallOutlinedIcon />
        </IconButton>
      </Box>
      <CardContent style={{ padding: '0 16px 16px' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            // fontWeight="bold"
            fontFamily="fantasy"
            color="text.secondary"
            letterSpacing={1}
            component="div"
            p={0}
            maxWidth="100%"
          >
            {product?.title.toUpperCase()}
          </Typography>
          <Stack spacing={0} alignItems="flex-end">
            <Typography
              variant="body1"
              style={{ lineHeight: '1rem' }}
              // fontFamily="fantasy"
              fontWeight="bold"
            >
              {product?.discount || product?.price}EGP
            </Typography>
            {product?.discount && (
              <Typography
                variant="overline"
                component="p"
                color="error"
                style={{
                  lineHeight: '1rem',
                  textDecoration: 'line-through',
                }}
              >
                Was:{product?.price}EGP
              </Typography>
            )}
          </Stack>
        </Stack>
        <ProductItemImageList
          product={product}
          onMainImageChange={(image) => setMainImage(image)}
          totalWidth={width || 350}
        />
      </CardContent>
    </Card>
  );
};

export default ProductItem;
