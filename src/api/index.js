import axios from "axios";
import tokenManager from "./utils";

export const baseURL = process.env.REACT_APP_API_URI;

const api = (config) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  });

  return axiosInstance(config);
};

export default api;
