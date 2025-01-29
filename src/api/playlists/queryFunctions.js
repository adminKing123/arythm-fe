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
