import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import tshirtIcon from '../../../../public/img/svg/tshirt.svg';
import hoodieIcon from '../../../../public/img/svg/hoodie.svg';
import tableuIcon from '../../../../public/img/svg/tableu.svg';

const ShopMenu = ({ anchorEl, onCloseMenu }) => {
  const paletteMode = useTheme().palette.mode;

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      onClose={onCloseMenu}
    >
      <MenuItem onClick={onCloseMenu}>
        <Link href={`/shop/category/tshirt/1`} style={{ width: '100%' }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            height="24px"
            // color="white"
            width="100%"
          >
            <Box width="25px" height="25px">
              <Image
                src={tshirtIcon}
                alt="#"
                width={25}
                height={25}
                color="inherit"
                style={{ filter: paletteMode === 'dark' && 'invert(1)' }}
              />
            </Box>
            <Divider orientation="vertical" />
            <Typography color="inherit">T-Shirt</Typography>
          </Stack>
        </Link>
      </MenuItem>
      <MenuItem onClick={onCloseMenu}>
        <Link href={`/shop/category/hoodie/1`} style={{ width: '100%' }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            height="24px"
            color="text.primary"
            width="100%"
          >
            <Box width="25px" height="25px">
              <Image
                src={hoodieIcon}
                alt="#"
                width={25}
                height={25}
                style={{ filter: paletteMode === 'dark' && 'invert(1)' }}
              />
            </Box>
            <Divider orientation="vertical" />
            <Typography color="inherit">Hoodie</Typography>
          </Stack>
        </Link>
      </MenuItem>
      <MenuItem onClick={onCloseMenu}>
        <Link href={`/shop/category/tableu/1`} style={{ width: '100%' }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            height="24px"
            color="text.primary"
            width="100%"
          >
            <Box width="25px" height="25px">
              <Image
                src={tableuIcon}
                alt="#"
                width={25}
                height={25}
                style={{ filter: paletteMode === 'dark' && 'invert(1)' }}
              />
            </Box>
            <Divider orientation="vertical" />
            <Typography color="inherit">Tableu</Typography>
          </Stack>
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default ShopMenu;
