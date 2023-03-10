import { Box, colors, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const ColorsButtonGroup = ({
  allColors,
  selectedColor,
  changeSelectedColorHandler,
  exclusive,
}) => {
  return (
    <ToggleButtonGroup
      variant="outlined"
      exclusive={exclusive}
      onChange={changeSelectedColorHandler}
      value={selectedColor}
      sx={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {allColors?.map((color) => (
        <ToggleButton
          value={color}
          key={color}
          sx={{
            border: 'none',
            padding: '4px',
            bgcolor: selectedColor === color && 'secondary.main',
          }}
          color="secondary"
        >
          <Box
            width={30}
            height={30}
            border="3px solid"
            borderColor={
              selectedColor === color ? 'secondary.main' : 'GrayText'
            }
            borderRadius={9999}
            bgcolor={
              color === 'black'
                ? 'black'
                : color === 'blue'
                ? '#062730'
                : color === 'gray'
                ? '#aeadb1'
                : color === 'red'
                ? '#bd0d32'
                : color === 'green'
                ? '#545840'
                : color === 'white' && 'white'
            }
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ColorsButtonGroup;
