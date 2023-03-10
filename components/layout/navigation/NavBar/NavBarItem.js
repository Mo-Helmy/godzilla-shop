import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBarItem = ({ title, url }) => {
  const router = useRouter();

  return (
    <Box>
      <Link href={url}>
        <Typography
          component="div"
          bgcolor={router.pathname === url && 'primary.dark'}
          px={2}
          py={1.5}
          color="whitesmoke"
          sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          {title}
        </Typography>
      </Link>
    </Box>
  );
};

export default NavBarItem;
