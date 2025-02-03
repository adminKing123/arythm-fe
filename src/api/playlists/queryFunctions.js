import api from "..";
import API_ENDPOINTS from "../endpoints";

export const createPlaylist = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.CREATE_PLAYLIST,
    data,
  });

  return response.data;
};

export const getPlaylists = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_PLAYLISTS,
    params: {
      song_id: data?.song_id || "",
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};

export const addSongsInPlaylist = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.ADD_SONGS_IN_PLAYLIST(data.id),
    data,
  });

  return response.data;
};

export const getPlaylistSongs = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_PLAYLIST_SONGS(data.id),
    params: {
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};
