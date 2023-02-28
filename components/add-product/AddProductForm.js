import {
  Box,
  Button,
  FormHelperText,
  IconButton,
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
  console.log(
    '🚀 ~ file: AddProductForm.js:28 ~ AddProductForm ~ imagesUrl:',
    imagesUrl
  );
  const [size, setSize] = useState(100);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [removeColor, setRemoveColor] = useState(false);

  const dispatch = useDispatch();

  console.log(design._id);
  console.log({ session });

  // const changeSelectedColorsHandler = (e, newValue) => {
  //   setErrorMsg('');
  //   if (!productType) return setErrorMsg('Please select product type!');
  //   if (newValue.length < selectedColors.length) {
  //     console.log('=========REMOVE COLOR=============');
  //     setRemoveColor(true);
  //     selectedColors.map((sColor, sIndex) => {
  //       if (!newValue.includes(sColor)) {
  //         console.log(
  //           '🚀 ~ file: AddProductForm.js:47 ~ selectedColors.map ~ sColor:',
  //           sColor,
  //           sIndex
  //         );
  //         setImagesUrl((prev) =>
  //           prev.slice(0, sIndex).concat(prev.slice(sIndex + 1))
  //         );
  //       }
  //     });
  //   } else {
  //     setRemoveColor(false);
  //   }
  //   setSelectedColors(newValue);
  // };

  const changeSelectedColorsHandler = async (e, newValue) => {
    console.log(
      '🚀 ~ file: AddProductForm.js:39 ~ changeSelectedColorsHandler ~ newValue:',
      newValue
    );
    setErrorMsg('');
    if (!productType) return setErrorMsg('Please select product type!');

    const fileName = design.fileName.split('.')[0];
    let imagesUrlArr = [];

    newValue.map((color) => {
      imagesUrlArr.push(
        `${apiUrl}/api/media/preview?design=${fileName}&type=${productType}&color=${color}&size=${size}`
      );
    });

    setImagesUrl(imagesUrlArr);
    setSelectedColors(newValue);
  };

  const changeSizeHandler = (e, n) => {
    setSize(n);
  };

  // useEffect(() => {
  //   const fileName = design.fileName.split('.')[0];
  //   const color = selectedColors[selectedColors.length - 1];
  //   if (selectedColors.length === 0) return;
  //   if (removeColor) return;
  //   axios
  //     .get(
  //       `${apiUrl}/api/media/preview?design=${fileName}&type=${productType}&color=${color}&size=${size}`,
  //       { responseType: 'blob' }
  //     )
  //     .then((response) => {
  //       // const reader = new FileReader();
  //       // reader.readAsDataURL(response.data);
  //       // reader.onload = (ev) => {
  //       //   console.log('🚀 ~ file: AddProductForm.js:55 ~ .then ~ ev:', ev);
  //       //   setImagesUrl((prev) => prev.concat(ev.target.result));
  //       // };

  //       const objectUrl = URL.createObjectURL(response.data);
  //       setImagesUrl((prev) => prev.concat(objectUrl));
  //     });
  // }, [selectedColors, removeColor]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🚀 ~ file: AddProductForm.js:67 ~ timer ~ size', size);
      const fileName = design.fileName.split('.')[0];
      // let imagesUrlArr = [];
      // selectedColors.map(async (color, index) => {
      //   console.log(
      //     '🚀 ~ file: AddProductForm.js:142 ~ selectedColors.map ~ index:',
      //     index
      //   );
      //   const response = await axios.get(
      //     `${apiUrl}/api/media/preview?design=${fileName}&type=${productType}&color=${color}&size=${size}`,
      //     { responseType: 'blob' }
      //   );
      //   const objectUrl = URL.createObjectURL(response.data);
      //   imagesUrlArr.push(objectUrl);
      //   if (index === selectedColors.length - 1) {
      //     console.log(
      //       '🚀 ~ file: AddProductForm.js:61 ~ timer ~ imagesUrlArr:',
      //       imagesUrlArr
      //     );
      //     setImagesUrl(imagesUrlArr);
      //   }
      // });

      const imagesUrlArr = selectedColors.map(
        (color) =>
          `${apiUrl}/api/media/preview?design=${fileName}&type=${productType}&color=${color}&size=${size}`
      );

      setImagesUrl(imagesUrlArr);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [size]);

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

      <Button
        variant="contained"
        color="secondary"
        style={{ width: 'fit-content', borderRadius: 9999 }}
        disabled={!productType || selectedColors.length === 0 || isSubmiting}
        onClick={submitHandler}
      >
        {isSubmiting ? 'sending' : 'Add Product'}
      </Button>
    </Stack>
  );
};

export default AddProductForm;
