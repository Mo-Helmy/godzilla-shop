import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Favorite from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SignedUserAccountMenu = () => {
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const { data: session } = useSession();

  return (
    <>
      <IconButton
        sx={{
          color: 'whitesmoke',
          '&:hover': { bgcolor: 'primary.dark' },
          height: 'fit-content',
          bgcolor: Boolean(accountAnchorEl) && 'primary.dark',
        }}
        onClick={(e) => setAccountAnchorEl(e.currentTarget)}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClose={() => setAccountAnchorEl(null)}
      >
        <MenuItem onClick={() => setAccountAnchorEl(null)}>
          <Link href={`/${session.id}/favorite`} style={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              height="24px"
              color="text.primary"
              width="100%"
            >
              <Favorite fontSize="small" color="inherit" />
              <Divider orientation="vertical" />
              <Typography color="inherit">Favorite</Typography>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setAccountAnchorEl(null)}>
          <Link href={`/${session.id}/cart`} style={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              height="24px"
              color="text.primary"
              width="100%"
            >
              <LocalMallOutlinedIcon fontSize="small" color="inherit" />
              <Divider orientation="vertical" />
              <Typography color="inherit">Cart</Typography>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setAccountAnchorEl(null)}>
          <Link href={`/${session.id}/orders`} style={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              height="24px"
              color="text.primary"
              width="100%"
            >
              <ShoppingCartCheckoutIcon fontSize="small" color="inherit" />
              <Divider orientation="vertical" />
              <Typography color="inherit">Orders</Typography>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            setAccountAnchorEl(null);
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            height="24px"
            color="text.primary"
            width="100%"
          >
            <ExitToAppOutlinedIcon fontSize="small" color="inherit" />
            <Divider orientation="vertical" />
            <Typography color="inherit">Logout</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SignedUserAccountMenu;
