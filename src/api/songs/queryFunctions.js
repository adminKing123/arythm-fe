import api from "..";
import API_ENDPOINTS from "../endpoints";

export const getSlides = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_SLIDES,
    data: data,
  });

  return response.data;
};
