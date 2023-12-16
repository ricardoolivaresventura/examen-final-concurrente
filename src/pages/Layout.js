import React from "react";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { closeSnackbar } from "../context/reducers/generalSnackbar";
import { useDispatch, useSelector } from "react-redux";

export default function Layout() {
  const generalSnackbar = useSelector((state) => state.generalSnackbar);
  const dispatch = useDispatch();

  return (
    <Container>
      <Outlet />
      <CustomSnackbar
        type={generalSnackbar.type}
        open={generalSnackbar.isOpen}
        setOpen={() => dispatch(closeSnackbar({}))}
        message={generalSnackbar.message}
      />
    </Container>
  );
}

const Container = styled.div``;
