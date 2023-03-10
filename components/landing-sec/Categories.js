import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Paper,
  Slide,
  Stack,
  useTheme,
} from '@mui/material';
import tshirt from '../../public/tshirt.png';
import hoodie from '../../public/hoodie.png';
import tableu from '../../public/tableu.jpg';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Categories = () => {
  const theme = useTheme();
  // const [isSlide, setIsSlide] = useState(false);

  // const sectionRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((enrties) => {
  //     console.log('🚀 ~ file: Categories.js:27 ~ observer ~ enrties:', enrties);
  //     if (enrties[0].isIntersecting) {
  //       setIsSlide(true);
  //     }
  //     //  else {
  //     //   setIsSlide(false);
  //     // }
  //   });
  //   console.log('🚀 ~ file: Categories.js:27 ~ observer ~ observer:', observer);

  //   observer.observe(sectionRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [sectionRef.current]);

  return (
    <Container sx={{ py: 4 }}>
      {/* <Card>
        <CardMedia />
      </Card> */}
      {/* <Slide in={isSlide} direction="up"> */}
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        flexWrap="wrap"
        // ref={sectionRef}
      >
        <Paper sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
              '&:hover + a button': { filter: 'opacity(1)' },
            }}
          >
            <Image src={tshirt} alt="#" width={300} height={300} />
          </Box>
          <Link href="/shop/category/tshirt/1">
            <Button
              sx={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '50%',
                color: 'white',
                filter: 'opacity(0)',
                '&:hover': { filter: 'opacity(1)' },
              }}
              variant="contained"
              color="primary"
            >
              T-Shirts
            </Button>
          </Link>
        </Paper>
        <Paper sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
              '&:hover + a button': { filter: 'opacity(1)' },
            }}
          >
            <Image src={hoodie} alt="#" width={300} height={300} />
          </Box>
          <Link href="/shop/category/hoodie/1">
            <Button
              sx={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '50%',
                color: 'white',
                filter: 'opacity(0)',
                '&:hover': { filter: 'opacity(1)' },
              }}
              variant="contained"
              color="primary"
            >
              Hoodies
            </Button>
          </Link>
        </Paper>
        <Paper sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
              '&:hover + a button': { filter: 'opacity(1)' },
            }}
          >
            <Image src={tableu} alt="#" width={300} height={300} />
          </Box>
          <Link href="/shop/category/tableu/1">
            <Button
              sx={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '50%',
                color: 'white',
                filter: 'opacity(0)',
                '&:hover': { filter: 'opacity(1)' },
              }}
              variant="contained"
              color="primary"
            >
              Tablues
            </Button>
          </Link>
        </Paper>
      </Stack>
      {/* </Slide> */}
    </Container>
  );
};

export default Categories;
