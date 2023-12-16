import React, { useState } from "react";
import styled, { css } from "styled-components";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import ModalContainer from "./ModalContainer";

export default function ProductDetails({ isVisible, setIsVisible }) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return <div>ProductDetails</div>;
}
