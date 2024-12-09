import api from "..";
import API_ENDPOINTS from "../endpoints";

export const register = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.register,
    data: data,
  });

  return response.data;
};
