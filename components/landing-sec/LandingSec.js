import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import landingImage from '../../public/landing-image.png';
import landingImage2 from '../../public/landing-image2.jpg';
import grayTshirt from '../../public/gray-tshirt.png';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import Image from 'next/image';

const LandingSec = () => {
  const theme = useTheme();
  const router = useRouter();

  const typographyColor = theme.palette.mode === 'dark' ? '#c8beb9' : '#50505e';
  return (
    <Stack width="100%" height="calc(100vh - 66px)" position="relative">
      <Stack
        width="100vw"
        // height="100vh"
        height="calc(100vh - 66px)"
        sx={{
          // backgroundImage: 'url(./RectLight.svg)',
          backgroundImage:
            theme.palette.mode === 'dark'
              ? 'url(./landing-image2.jpg)'
              : 'url(./whiteTshirt-whitePg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
          transform: 'translateX(-50%)',
        }}
        // top="-66px"
        position="absolute"
        left="50%"
        // zIndex="-10"
      >
        <Container
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            // zIndex: '0',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              transform: 'translateY(-70%)',
              top: '70%',
              width: { xs: '100%', md: '50%' },
            }}
          >
            <Typography
              variant="h2"
              component="div"
              fontWeight="bolder"
              color={typographyColor}
              width="100%"
              maxWidth={550}
            >
              YOUR FAVORITES
              {'\n'}
              ARE BACK
            </Typography>
            <Typography
              variant="h5"
              component="div"
              color={typographyColor}
              fontWeight="bolder"
            >
              Shop these Original Printed Tees Whiz best Designs!
            </Typography>
            <Button
              sx={{
                color: typographyColor,
                fontSize: '1.25rem',
                fontWeight: 'bolder',
                my: 2,
                borderRadius: 9999,
              }}
              variant="outlined"
              size="large"
              onClick={() => router.push('/shop')}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Stack>
      {/* <Stack
        width="100vw"
        height="calc(100vh - 66px)"
        sx={{
          backgroundImage: 'url(./RectLight.svg)',
          // backgroundImage: 'url(./landing-image.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transform: 'translateX(-50%)',
        }}
        position="absolute"
        left="50%"
      />
      <Image
        src={grayTshirt}
        alt="#"
        height="70vh"
        style={{
          position: 'absolute',
          bottom: 0,
          right: '20px',
          height: '70%',
        }}
      />
      <Container sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            transform: 'translateY(-70%)',
            top: '70%',
            width: { xs: '100%', md: '50%' },
          }}
        >
          <Typography
            variant="h2"
            component="div"
            fontWeight="bolder"
            color="#0E4647"
            width="100%"
            maxWidth={550}
          >
            YOUR FAVORITES
            {'\n'}
            ARE BACK
          </Typography>
          <Typography
            variant="h5"
            component="div"
            color="#0E4647"
            fontWeight="bolder"
          >
            Shop these Original Printed Tees Whiz best Designs!
          </Typography>
        </Box>
      </Container> */}
    </Stack>
  );
};

export default LandingSec;
