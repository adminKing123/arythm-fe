import axios from "axios";

const baseURL = process.env.REACT_APP_API_URI;

console.log(baseURL);

const api = (config) => {
  return axios({
    ...config,
    baseURL: baseURL,
  });
};

export default api;
