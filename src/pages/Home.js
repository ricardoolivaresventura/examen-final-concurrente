import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProductForm from "../components/NewProductForm";
import TopTabs from "../components/TopTabs";
import { useSearchParams } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import SalesList from "../components/SalesList";

const PRODUCTS = "PRODUCTS";
const SALES = "SALES";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paramType, setParamType] = useState(PRODUCTS);
  const [wantToGetProducts, setWantToGetProducts] = useState(false);

  useEffect(() => {
    setParamType(searchParams.get("type")?.toUpperCase() ?? PRODUCTS);
  }, [searchParams]);

  const handleClick = () => setIsModalVisible(true);

  return (
    <Container>
      <Title>🚀Examen Final Programación concurrente y distribuida🚀</Title>
      <Main>
        <TopTabsContainer>
          <TopTabs />
        </TopTabsContainer>
        {paramType === PRODUCTS ? (
          <ProductsList
            wantToGetProducts={wantToGetProducts}
            setWantToGetProducts={setWantToGetProducts}
          />
        ) : paramType === SALES ? (
          <SalesList
            wantToGetProducts={wantToGetProducts}
            setWantToGetProducts={setWantToGetProducts}
          />
        ) : (
          <></>
        )}
      </Main>
      <CustomIconButton onClick={handleClick}>
        <AddIcon style={{ color: "white", fontSize: "45px" }} />
      </CustomIconButton>
      <NewProductForm
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setWantToGetProducts={setWantToGetProducts}
        wantToGetProducts={wantToGetProducts}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 100vw;
  height: 100vh;
  background-color: black;
  padding-top: 40px;
`;

const Title = styled.p`
  color: white;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
`;

const Main = styled.main`
  padding: 20px 10%;
  margin: auto;
  max-width: 1400px;
`;

const TopTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CustomIconButton = styled(IconButton)`
  position: fixed;
  height: 70px;
  width: 70px;
  bottom: 40px;
  right: 40px;
  z-index: 999;
  &&& {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
