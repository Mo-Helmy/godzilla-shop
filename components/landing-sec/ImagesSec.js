import { Box, Grid, Stack } from '@mui/material';
import React from 'react';

const ImagesSec = () => {
  return (
    <Grid container width="100%" height="50vh" py={2}>
      <Grid item xs={6} sm={3}>
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundImage: 'url(img/img-sec/img1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundImage: 'url(img/img-sec/img2.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundImage: 'url(img/img-sec/img3.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundImage: 'url(img/img-sec/img4.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Grid>
    </Grid>
    // <Stack direction="row" width="100%" height="25vh">
    //   <Box
    //     width="100%"
    //     height="100%"
    //     sx={{
    //       backgroundImage: 'url(img/img-sec/img1.jpg)',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center center',
    //     }}
    //   ></Box>
    //   <Box
    //     width="100%"
    //     height="100%"
    //     sx={{
    //       backgroundImage: 'url(img/img-sec/img2.jpg)',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center center',
    //     }}
    //   ></Box>
    //   <Box
    //     width="100%"
    //     height="100%"
    //     sx={{
    //       backgroundImage: 'url(img/img-sec/img3.jpg)',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center center',
    //     }}
    //   ></Box>
    //   <Box
    //     width="100%"
    //     height="100%"
    //     sx={{
    //       backgroundImage: 'url(img/img-sec/img4.jpg)',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center center',
    //     }}
    //   ></Box>
    // </Stack>
  );
};

export default ImagesSec;
