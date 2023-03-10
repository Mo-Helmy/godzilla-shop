import { Button, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { s3Url } from '../../../util/link-config';

const ProductItemImageList = ({ product, onMainImageChange, totalWidth }) => {
  const colCount = totalWidth >= 350 ? 4 : totalWidth >= 250 ? 3 : 4;
  const imageWidth = Math.round((totalWidth - 40 - 15) / colCount);
  console.log(
    '🚀 ~ file: ProductItemImageList.js:8 ~ ProductItemImageList ~ imageWidth:',
    imageWidth
  );
  return (
    <ImageList
      cols={colCount}
      rowHeight={imageWidth}
      gap={5}
      sx={{ width: '100%', overflowX: 'auto' }}
    >
      {product?.imagesUrl.map((image) => (
        <ImageListItem key={image}>
          <Button
            sx={{
              width: `${imageWidth}px`,
              height: `${imageWidth}px`,
              maxHeight: `${imageWidth}px`,
            }}
            onClick={onMainImageChange.bind(null, image)}
            variant="outlined"
          >
            <Image
              src={s3Url + image}
              fill={true}
              sizes={40}
              alt={product?.title}
            />
          </Button>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProductItemImageList;
