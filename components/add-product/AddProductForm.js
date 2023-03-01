import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  LinearProgress,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { snackbarActions } from '../../store/snackbarSlice';
import { apiUrl } from '../../util/link-config';
import axiosInstance, { axiosApiAuth } from '../../util/axiosInstance';
import ColorsButtonGroup from '../products/ProductDetails/ColorsButtonGroup';
import axios from 'axios';

const colorsArr = ['black', 'blue', 'gray', 'red', 'green', 'white'];

const AddProductForm = ({ design, onBackHandler, session, token }) => {
  const [productType, setProductType] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [size, setSize] = useState(100);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  console.log(design._id);
  console.log({ session });

  const changeSelectedColorsHandler = (e, newValue) => {
    console.log(
      '🚀 ~ file: AddProductForm.js:39 ~ changeSelectedColorsHandler ~ newValue:',
      newValue
    );
    setErrorMsg('');
    if (!productType) return setErrorMsg('Please select product type!');
    if (loading) return;

    setSelectedColors(newValue);
  };

  const changeSizeHandler = (e, n) => {
    if (loading) return;
    setSize(n);
  };

  const previewHandler = () => {
    setErrorMsg('');
    if (!productType) return setErrorMsg('Please select product type!');
    if (selectedColors.length === 0) return setErrorMsg('Please select color!');
    if (loading) return;

    const fileName = design.fileName.split('.')[0];
    (async () => {
      setLoading(true);
      let imagesUrlArr = [];

      for (let index = 0; index < selectedColors.length; index++) {
        const response = await axios.get(
          `${apiUrl}/api/media/preview?design=${fileName}&type=${productType}&color=${selectedColors[index]}&size=${size}`,
          {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
              let percentCompleted = Math.round(
                ((progressEvent.loaded * 100) / progressEvent.total) *
                  ((index + 1) / selectedColors.length) +
                  (index * 100) / selectedColors.length
              );
              setProgress(percentCompleted);
              console.log(
                '🚀 ~ file: AddProductForm.js:143 ~ percentCompleted:',
                percentCompleted
              );
            },
          }
        );
        console.log(
          '🚀 ~ file: AddProductForm.js:159 ~ response.data:',
          response.data
        );
        const objectUrl = URL.createObjectURL(response.data);
        imagesUrlArr.push(objectUrl);
        console.log('=========1111==========');
        if (index === selectedColors.length - 1) {
          console.log('=========2222==========');
          console.log(
            '🚀 ~ file: AddProductForm.js:61 ~ timer ~ imagesUrlArr:',
            imagesUrlArr
          );
          setImagesUrl(imagesUrlArr);
        }
      }
      setLoading(false);
    })();
  };

  const submitHandler = async () => {
    const imagesUrlArr = selectedColors.map(
      (color) =>
        `/api/assets/final-products/${design._id}/${productType}/${color}.png`
    );

    setIsSubmiting(true);
    axiosApiAuth
      .post('/api/media', {
        design: design._id,
        type: productType,
        color: selectedColors,
        size,
      })
      .then(() =>
        axiosApiAuth.post('/api/products', {
          title: design.title,
          designId: design._id,
          designSize: size,
          colors: selectedColors,
          imagesUrl: imagesUrlArr,
          userId: session.id,
          tags: design.tags,
          type: productType,
        })
      )
      .then((res) => {
        dispatch(
          snackbarActions.openSnackbar({
            severity: 'success',
            message: 'Product Added Successfully!',
          })
        );
        setProductType('');
        setSelectedColors([]);
        setImagesUrl([]);
        setErrorMsg('');
      })
      .catch((err) =>
        dispatch(
          snackbarActions.openSnackbar({
            severity: 'error',
            message: 'Something Went Wrong!',
          })
        )
      )
      .finally(() => setIsSubmiting(false));
  };

  return (
    <Stack spacing={2} py={3} alignItems="center">
      <Box width="100%" my={-2}>
        <IconButton onClick={onBackHandler}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <FormHelperText error={Boolean(errorMsg)}>{errorMsg}</FormHelperText>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box width={300}>
          <TextField
            select
            value={productType}
            label="Select Product Type"
            fullWidth
            onChange={(e) => setProductType(e.target.value)}
          >
            <MenuItem value="tshirt">T-Shirt</MenuItem>
            <MenuItem value="hoodie">Hoodie</MenuItem>
          </TextField>
        </Box>
        <Box>
          <Typography>Colors:</Typography>
          <ColorsButtonGroup
            allColors={colorsArr}
            selectedColor={selectedColors}
            changeSelectedColorHandler={changeSelectedColorsHandler}
            exclusive={false}
          />
        </Box>
        <Box width={300}>
          <Typography>Size:</Typography>
          <FormHelperText>Default is 100% change it if needed</FormHelperText>
          <Slider
            value={size}
            valueLabelDisplay="on"
            step={1}
            onChange={changeSizeHandler}
            marks={[
              { value: 100, label: '100%' },
              { value: 90, label: '90' },
              { value: 80, label: '80' },
              { value: 70, label: '70' },
              { value: 60, label: '60' },
              { value: 50, label: '50' },
              { value: 40, label: '40' },
              { value: 30, label: '30' },
              { value: 20, label: '20' },
              { value: 10, label: '10' },
              { value: 0, label: '0%' },
            ]}
          />
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
        {imagesUrl.length > 0 &&
          imagesUrl.map((imageurl, index) => (
            <Image
              key={index}
              src={imageurl}
              width={300}
              height={300}
              alt={design.title}
              priority
            />
          ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" width={300}>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: 'fit-content', borderRadius: 9999 }}
          disabled={!productType || selectedColors.length === 0 || loading}
          onClick={previewHandler}
        >
          {loading ? 'loading' : 'Preview'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: 'fit-content', borderRadius: 9999 }}
          disabled={
            !productType ||
            selectedColors.length === 0 ||
            imagesUrl.length === 0 ||
            isSubmiting
          }
          onClick={submitHandler}
        >
          {isSubmiting ? 'sending' : 'Add Product'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddProductForm;
