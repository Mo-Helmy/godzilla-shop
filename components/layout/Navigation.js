import { AppBar, Container, useMediaQuery, useTheme } from '@mui/material';
import { useSession } from 'next-auth/react';

import useFavAndCart from '../../hooks/useFavAndCart';

import DesktopNavBar from './navigation/DesktopNavBar';
import MobileNavBar from './navigation/MobileNavBar';

const Navigation = () => {
  const theme = useTheme();
  const xsMedia = useMediaQuery('(max-width:600px)');

  const { data: session } = useSession();

  useFavAndCart(session);

  return (
    <AppBar position="relative" sx={{ bgcolor: theme.palette.primary.main }}>
      <Container>{xsMedia ? <MobileNavBar /> : <DesktopNavBar />}</Container>
    </AppBar>
  );
};

export default Navigation;
