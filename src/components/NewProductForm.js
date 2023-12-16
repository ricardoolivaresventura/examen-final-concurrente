import React, { useState } from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Autocomplete, Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import uuid from "random-uuid-v4";
import { UNITS } from "../constants";
import { createProduct } from "../api/product";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../context/reducers/generalSnackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const posibleWidth = ["xs", "sm", "md", "lg", "xl"];

export default function NewProductForm({
  isVisible,
  setIsVisible,
  setWantToGetProducts,
  wantToGetProducts,
}) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState(posibleWidth[2]);
  const [form, setForm] = useState({
    name: "",
    details: "",
    cost: null,
    unit: "KG",
    amount: null,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (newValue, type) => {
    setForm({ ...form, [type]: newValue });
  };

  const saveProduct = async () => {
    try {
      const product = {
        name: form.name,
        details: form.details,
        unit: form.unit,
        amount: form.amount,
        cost: form.cost,
      };
      setLoading(true);
      const response = await createProduct(product);
      setIsVisible(false);
      dispatch(
        openSnackbar({
          type: "success",
          message: "Producto creado correctamente",
        })
      );
      setWantToGetProducts(!wantToGetProducts);
    } catch (err) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Ocurrió un error al intentar crear el producto",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isVisible}
      scroll={"paper"}
      onClose={() => setIsVisible(false)}
      TransitionComponent={Transition}
    >
      <Container>
        <Header>
          <IconButton onClick={() => setIsVisible(false)}>
            <Close style={{ color: "white" }} />
          </IconButton>
        </Header>
        <Title>Crear nuevo producto</Title>
        <ItemContainer>
          <Label>Nombre:</Label>
          <CustomTextField
            type="text"
            placeholder="Nombre"
            value={form?.name}
            onChange={(e) => {
              handleChange(e.target.value, "name");
            }}
            variant="outlined"
            style={{ width: "100%" }}
            sx={{ input: { color: "white" } }}
          />
        </ItemContainer>
        <ItemContainer>
          <Label>Detalles:</Label>
          <CustomTextField
            type="text"
            placeholder="Detalles"
            value={form?.details}
            onChange={(e) => {
              handleChange(e.target.value, "details");
            }}
            variant="outlined"
            style={{ width: "100%" }}
            sx={{ input: { color: "white" } }}
          />
        </ItemContainer>
        <ItemContainer>
          <Row>
            <Item style={{ flex: 1 }}>
              <Label>Cantidad (Stock):</Label>
              <CustomTextField
                type="text"
                placeholder="Stock"
                value={form?.amount}
                onChange={(e) => {
                  handleChange(e.target.value, "amount");
                }}
                variant="outlined"
                style={{ width: "100%" }}
                sx={{ input: { color: "white" } }}
              />
            </Item>
            <Item>
              <Label>Unidad:</Label>
              <Autocomplete
                disablePortal
                value={form.unit}
                id="combo-box-demo"
                options={UNITS}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                  setForm({ ...form, unit: newValue });
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label="Unidad"
                    sx={{ input: { color: "white" } }}
                  />
                )}
              />
            </Item>
          </Row>
        </ItemContainer>
        <ItemContainer>
          <Label>Costo:</Label>
          <CustomTextField
            type="text"
            placeholder="Costo"
            value={form?.cost}
            onChange={(e) => {
              handleChange(e.target.value, "cost");
            }}
            variant="outlined"
            style={{ width: "100%" }}
            sx={{ input: { color: "white" } }}
          />
        </ItemContainer>
        <Footer>
          <CustomButton
            endIcon={<SaveIcon style={{ color: "white" }} />}
            disabled={loading}
            onClick={saveProduct}
          >
            {loading ? (
              <CircularProgress
                size={30}
                style={{ margin: "0px 20px", color: "white" }}
              />
            ) : (
              <ButtonTitle>Registrar producto</ButtonTitle>
            )}
          </CustomButton>
        </Footer>
      </Container>
    </Dialog>
  );
}

const Container = styled.div`
  position: relative;
  background-color: black;
  border: 0.1px solid rgba(155, 155, 155, 0.4);
  padding: 0px 10px;
  padding-top: 12px;
`;

const Title = styled.p`
  color: white;
  padding: 0px 18px;
  margin-bottom: 20px;
  font-size: 35px;
`;

const Header = styled.header`
  position: sticky;
  z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
`;

const ItemContainer = styled.div`
  padding: 0px 18px;
  margin-top: 16px;
  margin-bottom: 25px;
`;

const Subtitle = styled.p`
  margin-bottom: 8px;
  font-weight: 600;
`;

const Label = styled.p`
  color: white;
  margin-bottom: 12px;
`;

const CustomTextField = styled(TextField)`
  border: 0.1px solid rgba(155, 155, 155, 0.4);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
`;

const Item = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const CustomButton = styled(Button)`
  &&& {
    background-color: ${(props) => props.theme.colors.primary};
    text-transform: none;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 15px 25px;
    border-radius: 10px;
  }
`;

const ButtonTitle = styled.p`
  color: white;
  font-size: 18px;
`;
