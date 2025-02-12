import api from "..";
import API_ENDPOINTS from "../endpoints";

export const getAlbumSongs = async (data) => {
  const response = await api({
    method: "GET",
    url: API_ENDPOINTS.GET_ALBUM_SONGS(data.id),
    params: {
      limit: data?.limit || 12,
      offset: data?.offset || 0,
    },
  });

  return response.data;
};
