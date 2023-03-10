import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

import Link from 'next/link';
import { useState } from 'react';

const UnsignedUserAccountMenu = () => {
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

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
          <Link href={`/auth/login`} style={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              height="24px"
              color="text.primary"
              width="100%"
            >
              <LoginIcon fontSize="small" color="inherit" />
              <Divider orientation="vertical" />
              <Typography color="inherit">Login</Typography>
            </Stack>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setAccountAnchorEl(null)}>
          <Link href={`/auth/signup`} style={{ width: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              height="24px"
              color="text.primary"
              width="100%"
            >
              <AppRegistrationRoundedIcon fontSize="small" color="inherit" />
              <Divider orientation="vertical" />
              <Typography color="inherit">Signup</Typography>
            </Stack>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UnsignedUserAccountMenu;
