import { useMutation } from "react-query";
import { addRequestToAddSong } from "./queryFunctions";
import QUERY_KEYS from "../querykeys";

export const useAddRequestToAddSong = (config = {}) =>
  useMutation({
    mutationFn: (payload) => addRequestToAddSong(payload),
    mutationKey: [QUERY_KEYS.ADD_REQUEST_TO_ADD_SONG],
    ...config,
  });
