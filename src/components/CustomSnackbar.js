import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "@mui/material";

export default function CustomSnackbar({
  type = "success",
  open,
  setOpen,
  message,
  vertical = "bottom",
  horizontal = "right",
}) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      TransitionComponent={Slide}
      style={{ marginTop: "90px" }}
    >
      <Alert
        style={{ backgroundColor: type === "success" ? "#183582" : "#CD4F4F" }}
        onClose={handleClose}
        severity={type === "success" ? "success" : "error"}
        sx={{ width: "100%", color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
