import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const PRODUCTS = "PRODUCTS";
const SALES = "SALES";

export default function TopTabs() {
  const [selectedStatus, setSelectedStatus] = useState(SALES);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParamType = searchParams.get("type")?.toUpperCase();
    if (queryParamType === PRODUCTS || queryParamType === SALES) {
      setSelectedStatus(queryParamType ?? PRODUCTS);
    } else {
      navigate("/?type=products");
    }
  }, [searchParams]);

  const handleChange = (event, newValue) => {
    navigate({
      pathname: "/",
      search: `?type=${newValue.toLowerCase()}`,
    });
  };

  return (
    <Tabs
      value={selectedStatus}
      onChange={handleChange}
      className={classNames("mt-9")}
      TabIndicatorProps={{
        style: {
          backgroundColor: "#00a680",
        },
      }}
    >
      <Tab
        label={`Productos`}
        value={PRODUCTS}
        style={{ color: selectedStatus === PRODUCTS ? "#00a680" : "white" }}
      />
      <Tab
        label={`Ventas`}
        value={SALES}
        style={{ color: selectedStatus === SALES ? "#00a680" : "white" }}
        className={classNames("font-semiBold normal-case text-base px-10", {
          "text-primary": selectedStatus === SALES,
        })}
      />
    </Tabs>
  );
}
