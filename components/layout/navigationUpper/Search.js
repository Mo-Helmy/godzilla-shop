import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { apiUrl, s3Url } from '../../../util/link-config';
import { axiosApi } from '../../../util/axiosInstance';
import { useDispatch } from 'react-redux';
import { snackbarActions } from '../../../store/snackbarSlice';
import { useRouter } from 'next/router';

const Search = () => {
  const [category, setCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  console.log('🚀 ~ file: Search.js:19 ~ Search ~ searchValue:', searchValue);
  const [searchResult, setSearchResult] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openSearchMenu = Boolean(anchorEl);

  const router = useRouter();
  const dispatch = useDispatch();

  const searchRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) return;

    const timer = setTimeout(() => {
      console.log('🚀 ~ file: Search.js:8 ~ Search ~ searchValue', searchValue);
      const url =
        category === 'all'
          ? `/api/products?search=${searchValue.trim()}`
          : `/api/products?search=${searchValue.trim()}&type=${category}`;

      axiosApi
        .get(url)
        .then((res) => {
          setSearchResult(res.data.products || []);
          setAnchorEl(searchRef.current);
        })
        .catch((err) => {
          dispatch(
            snackbarActions.openSnackbar({
              severity: 'error',
              message: 'Search Faild!',
            })
          );
        });
    }, 1000);

    return () => {
      console.log('===CLEAR===');
      clearTimeout(timer);
    };
  }, [searchValue]);

  const searchHandler = () => {
    const url =
      category !== 'all'
        ? `/shop/search?search=${searchValue.trim()}&type=${category}`
        : `/shop/search?search=${searchValue.trim()}`;
    router.push(url);
  };

  return (
    <Box>
      <TextField
        placeholder="What do you need ?"
        size="medium"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && searchHandler()}
        color="divider"
        ref={searchRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                sx={{ height: '56px', mr: '-14px' }}
                onClick={searchHandler}
              >
                <SearchIcon />
              </Button>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <TextField
                sx={{ ml: '-14px' }}
                select
                placeholder="Select Category"
                variant="outlined"
                color="divider"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">ALL CATEGORIES</MenuItem>
                <MenuItem value="tshirt">T-SHIRT</MenuItem>
                <MenuItem value="hoodie">HOODIE</MenuItem>
                <MenuItem value="tableu">TABLEU</MenuItem>
              </TextField>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={openSearchMenu}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        // PaperProps={{ elevation: 2 }}
      >
        {searchResult.length === 0 ? (
          <Typography px={3} py={1}>
            No Products Found!
          </Typography>
        ) : (
          searchResult.map((item) => (
            <Link
              href={`/shop/${item._id}`}
              key={item._id}
              onClick={() => setAnchorEl(null)}
            >
              <MenuItem>
                <Avatar
                  src={s3Url + item.imagesUrl[0]}
                  alt={item.title}
                  sx={{ width: 75, height: 75 }}
                />
                <Typography>{item.title}</Typography>
              </MenuItem>
            </Link>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default Search;
