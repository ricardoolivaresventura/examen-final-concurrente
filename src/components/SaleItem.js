import React, { useState } from "react";
import styled from "styled-components";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { UNITS } from "../constants";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import ConfirmDeleteModal from "./ConfirmDeleteSale";
import { openSnackbar } from "../context/reducers/generalSnackbar";
import { deleteProduct } from "../api/product";
import { deleteSale } from "../api/sale";

export default function SaleItem({
  wantToGetProducts,
  setWantToGetProducts,
  ID_SALES,
  COST_TOTAL,
  NAME,
  RUC,
}) {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const confirmDeleteSale = async () => {
    try {
      setDeleting(true);
      setShowConfirmDeleteModal(false);
      const response = await deleteSale(ID_SALES);
      dispatch(
        openSnackbar({
          type: "success",
          message: "Venta eliminada correctamente",
        })
      );
      setWantToGetProducts(!wantToGetProducts);
    } catch (err) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Ocurrió un error al intentar eliminar la venta",
        })
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setShowConfirmDeleteModal(true);
  };

  return (
    <Container>
      <InfoContainer>
        <Name>Venta de {NAME}</Name>
        <Quantity>Ruc: {RUC}</Quantity>
      </InfoContainer>
      <PriceContainer>
        <Price>S/. {COST_TOTAL}</Price>
      </PriceContainer>
      <IconButton onClick={handleDelete} disabled={deleting}>
        {deleting ? (
          <CircularProgress size={20} style={{ color: "#00a680" }} />
        ) : (
          <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
        )}
      </IconButton>
      <ConfirmDeleteModal
        isVisible={showConfirmDeleteModal}
        setIsVisible={setShowConfirmDeleteModal}
        productName={""}
        confirmDelete={confirmDeleteSale}
      />
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 0.3px solid rgba(155, 155, 155, 0.3);
  gap: 12px;
  transition: all 0.4s;
  height: 110px;

  &:hover {
    background-color: rgba(155, 155, 155, 0.1);
  }
`;

const ImageContainer = styled.div`
  height: 80px;
  width: 80px;
  background-color: #00a680;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding-top: 8px;
  height: 100%;
`;

const Name = styled.p`
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const Details = styled.p`
  color: rgba(155, 155, 155, 0.6);
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Quantity = styled.p`
  color: white;
  margin-top: 5px;
  font-weight: 600;
  font-size: 15px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Price = styled.p`
  color: #00a680;
  font-weight: 600;
`;
