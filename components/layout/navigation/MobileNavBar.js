import { Collapse, IconButton, Stack } from '@mui/material';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import DesignerAccountMenu from './AccountMenu/DesignerAccountMenu';
import SignedUserAccountMenu from './AccountMenu/SignedUserAccountMenu';
import UnsignedUserAccountMenu from './AccountMenu/UnsignedUserAccountMenu';
import NavBarItem from './NavBar/NavBarItem';

const MobileNavBar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          sx={{
            color: 'whitesmoke',
            '&:hover': { bgcolor: 'primary.dark' },
            bgcolor: showNavMenu && 'primary.dark',
            height: 'fit-content',
            width: 'fit-content',
          }}
          onClick={() => setShowNavMenu((prev) => !prev)}
        >
          <ListOutlinedIcon fontSize="large" />
        </IconButton>
        {!session ? (
          <UnsignedUserAccountMenu />
        ) : session.role === 'designer' || session.role === 'admin' ? (
          <DesignerAccountMenu />
        ) : (
          <SignedUserAccountMenu />
        )}
      </Stack>
      <Collapse
        in={showNavMenu}
        orientation="vertical"
        unmountOnExit
        mountOnEnter
      >
        <Stack pt={1}>
          <NavBarItem title="HOME" url="/" />
          <NavBarItem title="SHOP" url="/shop" />
          <NavBarItem title="ABOUT" url="/about" />
          <NavBarItem title="CONTACT" url="/contact" />
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavBar;
