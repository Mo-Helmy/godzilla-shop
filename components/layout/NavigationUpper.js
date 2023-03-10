import { Box, Container, Stack, Typography } from '@mui/material';
import Search from './navigationUpper/Search';
import ColorModeIcon from './navigationUpper/ColorModeIcon';
import FavoriteNavIcon from './navigationUpper/FavoriteNavIcon';
import CartNavIcon from './navigationUpper/CartNavIcon';

const NavigationUpper = () => {
  return (
    <Container component="header">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        py={{ xs: 0.5, md: 2 }}
        gap={{ xs: 1, md: 0 }}
      >
        <Typography
          variant="h2"
          fontFamily="fantasy"
          component="div"
          color="primary.main"
        >
          GODZILLA.
        </Typography>
        <Search />
        <Box>
          <FavoriteNavIcon />
          <CartNavIcon />
          <ColorModeIcon />
        </Box>
      </Stack>
    </Container>
  );
};

export default NavigationUpper;
