import { Chip, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const ProductTags = ({ tags }) => {
  const router = useRouter();
  return (
    <Stack direction="column">
      {/* <Typography fontWeight="bold">Tags:</Typography> */}
      {/* <Divider /> */}
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        {typeof tags === 'string' ? (
          <Chip label={tags} clickable onDelete={() => {}} />
        ) : (
          tags.map((tag, index) => (
            <Chip
              key={tag + index}
              label={tag}
              clickable
              onClick={() => router.push(`/shop?page=1&tag=${tag}`)}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default ProductTags;
