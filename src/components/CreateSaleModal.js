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
import { createSale } from "../api/sale";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const posibleWidth = ["xs", "sm", "md", "lg", "xl"];

export default function CreateSaleModal({
  isVisible,
  setIsVisible,
  name,
  id,
  unit,
  cost,
  wantToGetProducts,
  setWantToGetProducts,
  url,
}) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState(posibleWidth[2]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ruc: "",
    cost_total: null,
    id_product: id,
    cantidad: null,
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (newValue, type) => {
    setForm({ ...form, [type]: newValue });
  };

  const getTotal = () => {
    return cost * (form?.cantidad ?? 0);
  };

  const saveSale = async () => {
    try {
      setLoading(true);
      const product = {
        ruc: form?.ruc,
        cost_total: getTotal(),
        id_prod: id,
        cantidad: parseFloat(form?.cantidad),
      };
      const response = await createSale(product);
      setLoading(false);
      setIsVisible(false);
      dispatch(
        openSnackbar({
          type: "success",
          message: "Venta creada correctamente",
        })
      );
      setWantToGetProducts(!wantToGetProducts);
    } catch (err) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Ocurrió un error al intentar crear la venta",
        })
      );
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
        <Title>Registrar nueva venta</Title>
        <Row>
          <ImageContainer>{url && <Image src={url} />}</ImageContainer>
          <div style={{ flex: 1 }}>
            <Label>Nombre del producto:</Label>
            <Label style={{ fontWeight: "bold", fontSize: "20px" }}>
              {name}
            </Label>
          </div>
        </Row>
        <Row>
          <Label>Costo por {unit}:</Label>
          <Label>S/. {cost}</Label>
        </Row>
        <ItemContainer>
          <Label>Cantidad en {unit}:</Label>
          <CustomTextField
            type="text"
            placeholder={`Cantidad en ${unit}`}
            value={form?.name}
            onChange={(e) => {
              handleChange(e.target.value, "cantidad");
            }}
            variant="outlined"
            style={{ width: "100%" }}
            sx={{ input: { color: "white" } }}
          />
        </ItemContainer>
        <ItemContainer>
          <Label>Ruc</Label>
          <CustomTextField
            type="text"
            placeholder={`Ruc`}
            value={form?.name}
            onChange={(e) => {
              handleChange(e.target.value, "ruc");
            }}
            variant="outlined"
            style={{ width: "100%" }}
            sx={{ input: { color: "white" } }}
          />
        </ItemContainer>
        <Row>
          <Total>Total:</Total>
          <Total>S/. {getTotal()}</Total>
        </Row>
        <Footer>
          <CustomButton
            endIcon={<SaveIcon style={{ color: "white" }} />}
            disabled={loading}
            onClick={saveSale}
          >
            {loading ? (
              <CircularProgress
                size={30}
                style={{ margin: "0px 20px", color: "white" }}
              />
            ) : (
              <ButtonTitle>Registrar venta</ButtonTitle>
            )}
          </CustomButton>
        </Footer>
      </Container>
    </Dialog>
  );
}

const ImageContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  background-color: #00a680;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

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

const Total = styled.p`
  color: #00a680;
  font-size: 22px;
  font-weight: bold;
`;

const CustomTextField = styled(TextField)`
  border: 0.1px solid rgba(155, 155, 155, 0.4);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0px 18px;
  margin-top: 30px;
  margin-bottom: 30px;
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
