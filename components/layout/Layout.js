import { Alert, Box, Container, Divider, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { snackbarActions } from '../../store/snackbarSlice';
import Navigation from './Navigation';
import NavigationUpper from './NavigationUpper';

const Layout = (props) => {
  const snackbarState = useSelector((state) => state.snackbar);
  console.log(
    '🚀 ~ file: Layout.js:10 ~ Layout ~ snackbarState:',
    snackbarState
  );
  const dispatch = useDispatch();
  return (
    <Box
      width="100vw"
      bgcolor="background.default"
      color="text.primary"
      // position="relative"
      height="100vh"
      sx={{ overflowY: 'auto' }}
      onScroll={(e) => {
        // console.log('clientHeight========', e.target.clientHeight);
        // console.log('scrollHeight========', e.target.scrollHeight);
        // console.log('scrollTop========', e.currentTarget.scrollTop);

        const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
        // console.log('----', scrollHeight - scrollTop);

        if (scrollHeight - scrollTop < clientHeight + 100) {
          console.log('########################=====DONE=========');
          dispatch(snackbarActions.setIsBottom(true));
        }
      }}
    >
      <NavigationUpper />
      <Navigation />
      {/* <Divider />
      <Navigation
        onshowSearchField={showSearchFieldHandler}
        onCloseSearchField={closeSearchFieldHandler}
        showSearchField={showSearchField}
      /> */}
      <Container sx={{ minHeight: '100vh' }}>
        {props.children}

        <Snackbar
          open={snackbarState.isOpen}
          autoHideDuration={3000}
          onClose={() => dispatch(snackbarActions.closeSnackbar())}
        >
          <Alert
            severity={snackbarState.severity}
            onClose={() => dispatch(snackbarActions.closeSnackbar())}
            variant="filled"
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Layout;
