import { Badge, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const FavoriteNavIcon = () => {
  const favoriteState = useSelector((state) => state.favorite);
  const { data: session } = useSession();

  return (
    <Link href={`/${session?.id}/favorite`}>
      <IconButton>
        <Badge badgeContent={favoriteState.value.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
    </Link>
  );
};

export default FavoriteNavIcon;
