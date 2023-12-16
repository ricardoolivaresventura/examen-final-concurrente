import { combineReducers } from "@reduxjs/toolkit";
import generalSnackbarSlice from "./reducers/generalSnackbar";

const rootReducer = combineReducers({
  generalSnackbar: generalSnackbarSlice,
});

export default rootReducer;
