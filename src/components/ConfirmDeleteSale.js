import React from "react";
import styled, { css } from "styled-components";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import ModalContainer from "./ModalContainer";

export default function ConfirmDeleteModal({
  isVisible,
  setIsVisible,
  deleting,
  setDeleting,
  confirmDelete,
}) {
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <ModalContainer isVisible={isVisible} setIsVisible={setIsVisible}>
      <Container>
        <Title>¿Eliminar venta?</Title>
        <Message>
          Si eliminas la venta ya no podrás visualizarlo en tu lista de ventas
        </Message>
        <ButtonsContainer>
          <CustomButton
            disabled={deleting}
            onClick={handleClose}
            withBackground={false}
          >
            <ButtonText white={false}>Cancelar</ButtonText>
          </CustomButton>
          <CustomButton
            disabled={deleting}
            onClick={confirmDelete}
            withBackground={true}
            customType="delete"
          >
            {deleting ? (
              <CircularProgress size={22} style={{ color: "white" }} />
            ) : (
              <ButtonText white={true}>Confirmar eliminación</ButtonText>
            )}
          </CustomButton>
        </ButtonsContainer>
      </Container>
    </ModalContainer>
  );
}

const Container = styled.div``;

const Title = styled.p`
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 20px;
  color: white;
`;

const Span = styled.span`
  text-transform: capitalize;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  @media screen and (max-width: 660px) {
    flex-direction: column-reverse;
  }
`;

const CustomButton = styled(Button)`
  &&& {
    border: 1px solid;
    border-radius: 20px;
    border-color: ${(props) =>
      props?.withBackground ? "transparent" : props.theme.colors.primary};
    background-color: ${(props) =>
      props?.withBackground ? "#F3264B" : "transparent"};
    ${(props) =>
      props.customType === "delete" &&
      css`
        width: 210px;
      `}
    @media screen and (max-width: 660px) {
      width: 100%;
    }
  }
`;

const ButtonText = styled.p`
  text-transform: none;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => (props.white ? "white" : props.theme.colors.primary)};
  font-size: 13px;
  padding: 0px 15px;
`;
