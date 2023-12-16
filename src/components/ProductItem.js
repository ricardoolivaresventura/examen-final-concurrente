import React, { useState } from "react";
import styled from "styled-components";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { UNITS } from "../constants";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import ConfirmDeleteModal from "./ConfirmDeleteProduct";
import { useDispatch } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { openSnackbar } from "../context/reducers/generalSnackbar";
import { deleteProduct } from "../api/product";
import CreateSaleModal from "./CreateSaleModal";

export default function ProductItem({
  NAME_PROD,
  UNIT,
  AMOUNT,
  DETAIL,
  COST,
  ID_PROD,
  IMAGE_URL,
  wantToGetProducts,
  setWantToGetProducts,
}) {
  const [showCreateSaleModal, setShowCreateSaleModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const getUnitName = () => {
    const index = UNITS.findIndex((item) => item.unit === UNIT);
    return UNITS[index !== -1 ? index : 0].label;
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setShowConfirmDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      setDeleting(true);
      setShowConfirmDeleteModal(false);
      const response = await deleteProduct(ID_PROD);
      dispatch(
        openSnackbar({
          type: "success",
          message: "Producto eliminado correctamente",
        })
      );
      setWantToGetProducts(!wantToGetProducts);
    } catch (err) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Ocurrió un error al intentar eliminar el producto",
        })
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleClick = () => {
    setShowCreateSaleModal(true);
  };

  return (
    <Container>
      <ImageContainer>{IMAGE_URL && <Image src={IMAGE_URL} />}</ImageContainer>
      <InfoContainer>
        <Name>{capitalizeFirstLetter(NAME_PROD ?? "")}</Name>
        <Details>{capitalizeFirstLetter(DETAIL ?? "")}</Details>
        <Quantity>
          {AMOUNT} {getUnitName()}
        </Quantity>
      </InfoContainer>
      <PriceContainer>
        <Price>
          S/. {COST} / {UNIT?.toLowerCase()}
        </Price>
      </PriceContainer>
      <IconButton onClick={handleDelete} disabled={deleting}>
        {deleting ? (
          <CircularProgress size={20} style={{ color: "#00a680" }} />
        ) : (
          <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
        )}
      </IconButton>
      <IconButton onClick={handleClick} disabled={deleting}>
        <AddOutlinedIcon style={{ color: "#00a680" }} />
      </IconButton>
      <ConfirmDeleteModal
        isVisible={showConfirmDeleteModal}
        setIsVisible={setShowConfirmDeleteModal}
        productName={NAME_PROD}
        confirmDelete={confirmDeleteProduct}
      />
      <CreateSaleModal
        isVisible={showCreateSaleModal}
        setIsVisible={setShowCreateSaleModal}
        name={NAME_PROD}
        id={ID_PROD}
        unit={UNIT}
        cost={COST}
        wantToGetProducts={wantToGetProducts}
        setWantToGetProducts={setWantToGetProducts}
        url={IMAGE_URL}
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
  position: relative;
  height: 80px;
  width: 80px;
  background-color: #00a680;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
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
  color: white;
  font-weight: 600;
`;
