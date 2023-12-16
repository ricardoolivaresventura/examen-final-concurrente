import React, { useEffect, useState } from "react";
import { getAllSales } from "../api/sale";
import { CircularProgress } from "@mui/material";
import SaleItem from "./SaleItem";
import styled from "styled-components";

export default function SalesList({ wantToGetProducts, setWantToGetProducts }) {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllSales()
      .then((data) => {
        setSales(data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }, [wantToGetProducts]);

  if (sales == null) {
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

  if (sales.length === 0) {
    return <Message>No se encontró ninguna venta</Message>;
  }

  return (
    <>
      {sales.map((sale, index) => (
        <SaleItem
          key={index}
          {...sale}
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
