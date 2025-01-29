import { useMutation } from "react-query";
import { createPlaylist } from "./queryFunctions";
import QUERY_KEYS from "../querykeys";

export const useCreatePlaylistMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => createPlaylist(payload),
    mutationKey: [QUERY_KEYS.CREATE_PLAYLIST],
    ...config,
  });
