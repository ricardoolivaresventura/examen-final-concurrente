import { apiClient } from "./saleConfig";

export const createSale = async (product) => {
  const payload = { ...product };
  const { data } = await apiClient.post(`ventas`, payload);
  return data;
};

export const getSale = async (id) => {
  const { data } = await apiClient.get(`ventas/${id}`);
  return data;
};

export const getAllSales = async () => {
  const { data } = await apiClient.get(`ventas`);
  return data;
};

export const deleteSale = async (id) => {
  const { data } = await apiClient.delete(`ventas/${id}`);
  return data;
};
