import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import ProductItem from '../products/ProductItem';
import Loading from '../UI/Loading';
import { useDispatch } from 'react-redux';
import { snackbarActions } from '../../store/snackbarSlice';
import { apiUrl, s3Url } from '../../util/link-config';
import { axiosApi, axiosApiAuth } from '../../util/axiosInstance';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DesignList = ({
  onCompleteSelectDesign,
  session,
  token,
  designsList,
  pagesCount,
}) => {
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedDesignProducts, setSelectedDesignProducts] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  console.log('🚀 ~ file: DesignList.js:47 ~ router:', router);

  const dispatch = useDispatch();

  useEffect(() => {
    setDesigns(designsList);
  }, [designsList]);

  const selectedDesignProductsHandler = (design) => {
    setSelectedDesign(design);
    setOpenDialog(true);

    if (design) {
      setIsLoading(true);
      axiosApi
        .get(`/api/products?design_id=${design._id}`)
        .then((res) => setSelectedDesignProducts(res.data.products))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

  const closeDialogHandler = () => {
    setOpenDialog(false);
    setSelectedDesign(null);
    setSelectedDesignProducts(null);
  };

  console.log({ selectedDesignProducts });
  console.log({ selectedDesign });

  const deleteDesignHandler = () => {
    axiosApiAuth
      .delete(`${apiUrl}/api/media/design/${selectedDesign._id}`)
      .then(() => {
        setOpenDeleteDialog(false);
        setDesigns((prev) => prev.filter((d) => d._id !== selectedDesign._id));
        dispatch(
          snackbarActions.openSnackbar({
            severity: 'success',
            message: 'Deleted Successfully!',
          })
        );
      })
      .catch(() => {
        dispatch(
          snackbarActions.openSnackbar({
            severity: 'error',
            message: 'Delete Failed!',
          })
        );
      });
  };

  return (
    // <Stack direction="column" justifyContent="center" height="fit-content">
    <>
      <Masonry
        mt={3}
        // container
        spacing={2}
        // gap={2}
        // direction="row"
        // flexWrap="wrap"
        // justifyContent="center"
        // alignItems="flex-start"
        columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
        // columns={1}
        // sx={{ width: '100%' }}
      >
        {designs.length > 0 &&
          designs.map((design) => (
            <Card sx={{ maxWidth: '100%' }} key={design._id}>
              <CardHeader
                color="inherit"
                avatar={
                  <Avatar
                    src={`${s3Url}/api/assets/designs/${design.fileName}`}
                    // src={`${apiUrl}/api/media/preview?design=${
                    //   design.fileName.split('.')[0]
                    // }`}
                  />
                }
                title={`${design.title.toUpperCase()}`}
                action={
                  <IconButton
                    onClick={() => {
                      setSelectedDesign(design);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />

              <Divider />
              <CardMedia
                component="img"
                image={`${s3Url}/api/assets/designs/${design.fileName}`}
                // image={`${apiUrl}/api/media/preview?design=${
                //   design.fileName.split('.')[0]
                // }`}
                // width="100%"
                // height="100%"
                sx={{ width: '100%' }}
              />
              <Divider />

              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 3,
                }}
              >
                <Button
                  size="small"
                  onClick={selectedDesignProductsHandler.bind(null, design)}
                >
                  Products
                </Button>
                <Button
                  size="small"
                  onClick={() => onCompleteSelectDesign(design)}
                >
                  New Product
                </Button>
              </CardActions>
            </Card>
          ))}

        <Dialog open={openDialog} onClose={closeDialogHandler}>
          {selectedDesign && (
            <>
              <DialogTitle display="flex">
                <Avatar
                  src={`${s3Url}/api/assets/designs/${selectedDesign.fileName}`}
                />
                <Typography variant="h6" component="div" ml={2}>
                  {selectedDesign.title.toUpperCase()} Products
                </Typography>
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={2}
                  justifyContent="center"
                >
                  {!selectedDesignProducts ? (
                    <CircularProgress />
                  ) : selectedDesignProducts.length > 0 ? (
                    selectedDesignProducts.map((product) => (
                      <ProductItem product={product} key={product._id} />
                    ))
                  ) : (
                    <Typography>No Products Founnd!</Typography>
                  )}
                </Stack>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={() => onCompleteSelectDesign(selectedDesign)}>
                  Add New Product
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          style={{ padding: 20 }}
        >
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You will delete {selectedDesign?.title} design and all releated
              Products ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={deleteDesignHandler}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Masonry>

      <Stack alignItems="center" pb={8}>
        <Pagination
          count={pagesCount}
          page={+router.query.p || 1}
          variant="outlined"
          onChange={(e, newValue) => {
            router.push(`/${router.query.userId}/add-product?p=${newValue}`);
          }}
        />
      </Stack>
    </>
    // </Stack>
    // <Grid
    //   mt={3}
    //   container
    //   // spacing={2}
    //   gap={2}
    //   // direction="row"
    //   // flexWrap="wrap"
    //   justifyContent="center"
    //   alignItems="flex-start"
    // >
    //   {designs.length > 0 &&
    //     designs.map((design) => (
    //       <Grid item key={design._id} container xs="auto">
    //         <Card sx={{ maxWidth: 250 }}>
    //           <CardHeader
    //             color="inherit"
    //             avatar={
    //               <Avatar
    //                 src={`${apiUrl}/api/media/preview?design=${
    //                   design.fileName.split('.')[0]
    //                 }`}
    //               />
    //             }
    //             title={`${design.title.toUpperCase()}`}
    //             action={
    //               <IconButton
    //                 onClick={() => {
    //                   setSelectedDesign(design);
    //                   setOpenDeleteDialog(true);
    //                 }}
    //               >
    //                 <DeleteIcon />
    //               </IconButton>
    //             }
    //           />

    //           <Divider />
    //           <CardMedia
    //             component="img"
    //             image={`${apiUrl}/api/media/preview?design=${
    //               design.fileName.split('.')[0]
    //             }`}
    //             // width="100%"
    //             // height="100%"
    //             sx={{ width: '100%' }}
    //           />
    //           <Divider />

    //           <CardActions
    //             sx={{
    //               display: 'flex',
    //               justifyContent: 'space-between',
    //               py: 3,
    //             }}
    //           >
    //             <Button
    //               size="small"
    //               onClick={selectedDesignProductsHandler.bind(null, design)}
    //             >
    //               Products
    //             </Button>
    //             <Button
    //               size="small"
    //               onClick={() => onCompleteSelectDesign(design)}
    //             >
    //               New Product
    //             </Button>
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     ))}

    //   <Dialog open={openDialog} onClose={closeDialogHandler}>
    //     {selectedDesign && (
    //       <>
    //         <DialogTitle display="flex">
    //           <Avatar
    //             src={`${apiUrl}/api/media/preview?design=${
    //               selectedDesign.fileName.split('.')[0]
    //             }`}
    //           />
    //           <Typography variant="h6" component="div" ml={2}>
    //             {selectedDesign.title.toUpperCase()} Products
    //           </Typography>
    //         </DialogTitle>
    //         <Divider />
    //         <DialogContent>
    //           <Stack
    //             direction="row"
    //             flexWrap="wrap"
    //             gap={2}
    //             justifyContent="center"
    //           >
    //             {!selectedDesignProducts ? (
    //               <CircularProgress />
    //             ) : selectedDesignProducts.length > 0 ? (
    //               selectedDesignProducts.map((product) => (
    //                 <ProductItem product={product} key={product._id} />
    //               ))
    //             ) : (
    //               <Typography>No Products Founnd!</Typography>
    //             )}
    //           </Stack>
    //         </DialogContent>
    //         <Divider />
    //         <DialogActions>
    //           <Button onClick={() => onCompleteSelectDesign(selectedDesign)}>
    //             Add New Product
    //           </Button>
    //         </DialogActions>
    //       </>
    //     )}
    //   </Dialog>
    //   <Dialog
    //     open={openDeleteDialog}
    //     onClose={() => setOpenDeleteDialog(false)}
    //     style={{ padding: 20 }}
    //   >
    //     <DialogTitle>Are you sure ?</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>
    //         You will delete {selectedDesign?.title} design and all releated
    //         Products ?
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
    //       <Button onClick={deleteDesignHandler}>Delete</Button>
    //     </DialogActions>
    //   </Dialog>
    // </Grid>
  );
};

export default DesignList;
