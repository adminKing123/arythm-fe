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
      name: data?.q || "",
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

export const getSongsHistory = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_SONGS_HISTORY,
    params: {
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};

export const likeSong = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.LIKED_SONG,
    data: {
      song_id: data.id,
    },
  });

  return response.data;
};

export const removeFromlikedSong = async (data) => {
  const response = await api({
    method: "DELETE",
    url: API_ENDPOINTS.LIKED_SONG,
    data: {
      song_id: data.id,
    },
  });

  return response.data;
};

export const getLatestPlaylists = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.LATEST_PLAYLISTS,
  });

  return response.data;
};

export const getGlobalSearch = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GLOBAL_SEARCH,
    params: {
      q: data.q,
    },
  });

  return response.data;
};

export const getFilteredSongs = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.FILTER,
    params: {
      q: data.q,
      searchby: data.searchBy,
      sortby: data.sortBy,
      limit: data?.limit || 0,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};
