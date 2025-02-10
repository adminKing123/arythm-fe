import api from "..";
import API_ENDPOINTS from "../endpoints";

export const addRequestToAddSong = async (data) => {
  const response = await api({
    method: "POST",
    url: API_ENDPOINTS.ADD_REQUEST_TO_ADD_SONG,
    data: {
      name: data.name,
      description: data.description,
    },
  });

  return response.data;
};
