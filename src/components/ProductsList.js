import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Button, CircularProgress } from "@mui/material";
import { getAllProducts } from "../api/product";
import styled from "styled-components";

export default function ProductsList({
  wantToGetProducts,
  setWantToGetProducts,
}) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data?.reverse());
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }, [wantToGetProducts]);

  if (products == null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "55px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (products.length === 0) {
    return <Message>No se encontró ninguna venta</Message>;
  }

  return (
    <>
      {products.map((product, index) => (
        <ProductItem
          key={index}
          {...product}
          wantToGetProducts={wantToGetProducts}
          setWantToGetProducts={setWantToGetProducts}
        />
      ))}
    </>
  );
}

const Message = styled.p`
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 40px;
`;
