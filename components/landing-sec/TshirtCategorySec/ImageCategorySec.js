import { Box, Button, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const ImageCategorySec = ({ title, url }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        color="primary"
        bgcolor="#ffffff54"
        borderRadius={9999}
      >
        {title}
      </Typography>
      <Link href={url}>
        <Button
          sx={{
            fontWeight: 'bolder',
            // opacity: '0.8',
            // '&:hover': { opacity: '1' },
          }}
          variant="contained"
          color="primary"
        >
          Discover More
        </Button>
        <Divider />
      </Link>
    </Box>
  );
};

export default ImageCategorySec;
