import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    isOpen: false,
    message: '',
    severity: 'info',
    isBottom: false,
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    closeSnackbar: (state, action) => {
      state.isOpen = false;
      // state.severity = null;
      // state.message = '';
    },
    setIsBottom: (state, action) => {
      state.isBottom = action.payload;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;
