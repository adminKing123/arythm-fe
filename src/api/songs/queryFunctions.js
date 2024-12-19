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

export const getSongs = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_SONGS,
    params: {
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};

export const getArtists = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_ARTISTS,
    params: {
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};

export const getSong = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_SONG(data.id),
  });

  return response.data;
};
