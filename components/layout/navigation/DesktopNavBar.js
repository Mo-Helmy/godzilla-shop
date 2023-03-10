import { Divider, Stack } from '@mui/material';
import { useSession } from 'next-auth/react';
import NavBarItem from './NavBar/NavBarItem';
import DesignerAccountMenu from './AccountMenu/DesignerAccountMenu';
import UnsignedUserAccountMenu from './AccountMenu/UnsignedUserAccountMenu';
import SignedUserAccountMenu from './AccountMenu/SignedUserAccountMenu';
import ShopMenu from './NavBar/ShopMenu';
import { useState } from 'react';

const DesktopNavBar = () => {
  const [shopAnchorEl, setShopAnchorEl] = useState(null);

  const { data: session } = useSession();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" height={48}>
        <NavBarItem title="HOME" url="/" />
        <Divider orientation="vertical" />
        <div onClick={(e) => setShopAnchorEl(e.currentTarget)}>
          <NavBarItem title="SHOP" url="/shop" />
        </div>
        <Divider orientation="vertical" />
        <NavBarItem title="ABOUT" url="/about" />
        <Divider orientation="vertical" />
        <NavBarItem title="CONTACT" url="/contact" />
      </Stack>
      {!session ? (
        <UnsignedUserAccountMenu />
      ) : session.role === 'admin' || session.role === 'designer' ? (
        <DesignerAccountMenu />
      ) : (
        <SignedUserAccountMenu />
      )}
      <ShopMenu
        anchorEl={shopAnchorEl}
        onCloseMenu={() => setShopAnchorEl(null)}
      />
    </Stack>
  );
};

export default DesktopNavBar;
