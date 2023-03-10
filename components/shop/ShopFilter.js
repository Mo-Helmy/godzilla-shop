import {
  Autocomplete,
  Box,
  Button,
  Chip,
  colors,
  Divider,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../util/axiosInstance';
import { apiUrl } from '../../util/link-config';
import ColorsButtonGroup from '../products/ProductDetails/ColorsButtonGroup';

const colorsArr = ['black', 'blue', 'gray', 'red', 'green', 'white'];
const typesArr = ['tshirt', 'hoodie', 'tablue'];

const ShopFilter = ({ onSearch, onClose }) => {
  const [sort, setSort] = useState('-1');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  console.log(
    '🚀 ~ file: ShopFilter.js:28 ~ ShopFilter ~ selectedTypes:',
    selectedTypes
  );

  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/media/design/tags')
      .then((res) => setAllTags(res.data));
  }, []);

  const resetHandler = () => {
    setSort('-1');
    setSelectedColors([]);
    setSelectedTags([]);
    setSelectedTypes([]);
  };

  const searchHandler = () => {
    const searchQuery = {
      sort,
      color: selectedColors.length > 0 ? selectedColors : null,
      tag: selectedTags.length > 0 ? selectedTags : null,
      type: selectedTypes.length > 0 ? selectedTypes : null,
    };

    onSearch(searchQuery);

    onClose && onClose();
  };

  const selectTypeHandler = (type) => {
    selectedTypes.includes(type)
      ? setSelectedTypes((prev) => prev.filter((item) => item !== type))
      : setSelectedTypes((prev) => prev.concat(type));
  };

  const selectTagHandler = (tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags((prev) => prev.filter((item) => item !== tag))
      : setSelectedTags((prev) => prev.concat(tag));
  };

  return (
    <Stack spacing={2} pt={4} p={2} width={280}>
      <TextField
        select
        label="Sort By:"
        size="small"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <MenuItem value="-1">Recent</MenuItem>
        <MenuItem value="1">Oldest</MenuItem>
      </TextField>
      <Divider />

      <Stack spacing={1}>
        <Typography lineHeight={1}>Colors:</Typography>
        <ColorsButtonGroup
          allColors={colorsArr}
          selectedColor={selectedColors}
          changeSelectedColorHandler={(e, n) => setSelectedColors(n)}
          exclusive={false}
        />
      </Stack>
      <Divider />

      <Box width="100%">
        <Typography gutterBottom>Tags</Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {allTags.map((tag, index) => (
            <Chip
              key={tag + index}
              label={tag.toUpperCase()}
              size="small"
              variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
              color={selectedTags.includes(tag) ? 'secondary' : 'default'}
              icon={selectedTags.includes(tag) ? <DoneIcon /> : undefined}
              onClick={selectTagHandler.bind(null, tag)}
            />
          ))}
        </Stack>
      </Box>
      <Divider />

      <Box width="100%">
        <Typography gutterBottom>Category</Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {typesArr.map((type, index) => (
            <Chip
              key={type + index}
              label={type.toUpperCase()}
              size="small"
              variant={selectedTypes.includes(type) ? 'filled' : 'outlined'}
              color={selectedTypes.includes(type) ? 'secondary' : 'default'}
              icon={selectedTypes.includes(type) ? <DoneIcon /> : undefined}
              onClick={selectTypeHandler.bind(null, type)}
            />
          ))}
        </Stack>
      </Box>
      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={resetHandler}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={searchHandler}>
          Search
        </Button>
      </Stack>
    </Stack>
  );
};

export default ShopFilter;
