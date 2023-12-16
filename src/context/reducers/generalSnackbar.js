import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "success",
  isOpen: false,
  message: "",
  vertical: "bottom",
  horizontal: "right",
};

const generalSnackbarSlice = createSlice({
  name: "generalSnackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    closeSnackbar: (state, action) => {
      state.isOpen = false;
    },
    setSnackbarMessage: (state, action) => {
      state.message = action.payload.message;
    },
    setSnackbarPosition: (state, action) => {
      state.vertical = action.payload.vertical;
      state.horizontal = action.payload.horizontal;
    },
  },
});

export const {
  closeSnackbar,
  openSnackbar,
  setSnackbarMessage,
  setSnackbarPosition,
} = generalSnackbarSlice.actions;

export default generalSnackbarSlice.reducer;
