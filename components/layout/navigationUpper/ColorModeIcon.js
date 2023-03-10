import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { useContext, useEffect } from 'react';
import { ColorModeCtx } from '../../../pages/_app';

const ColorModeIcon = () => {
  const colorModeCtx = useContext(ColorModeCtx);
  const theme = useTheme();

  useEffect(() => {
    if (localStorage.getItem('colorMode')) {
      const colorMode = localStorage.getItem('colorMode');
      colorModeCtx.setColorMode(colorMode);
    }
  }, []);

  const toggleColorModeHandler = () => {
    localStorage.setItem(
      'colorMode',
      theme.palette.mode === 'light' ? 'dark' : 'light'
    );
    colorModeCtx.toggleColorMode();
  };
  return (
    <IconButton onClick={toggleColorModeHandler}>
      {theme.palette.mode === 'light' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ColorModeIcon;
