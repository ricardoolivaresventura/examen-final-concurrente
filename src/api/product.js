import { apiClient } from "./productConfig";

export const createProduct = async (product) => {
  const payload = {
    nameProd: product?.name,
    detail: product?.details,
    unit: product?.unit?.unit,
    amount: product?.amount,
    cost: product?.cost,
  };

  const { data } = await apiClient.post(`almacen`, payload);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await apiClient.get(`almacen/${id}`);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await apiClient.get("almacen");
  return data;
};

export const deleteProduct = async (productId) => {
  const { data } = await apiClient.delete(`almacen/${productId}`);
  return data;
};

export const udpateProduct = () => {};
