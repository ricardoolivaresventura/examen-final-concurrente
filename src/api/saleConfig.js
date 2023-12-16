const axios = require("axios").default;

const apiClientConfig = {
  baseURL: "http://10.10.0.30:9090",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(apiClientConfig);
