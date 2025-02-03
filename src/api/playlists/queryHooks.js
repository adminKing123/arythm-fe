import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  addSongsInPlaylist,
  createPlaylist,
  getPlaylists,
  getPlaylistSongs,
} from "./queryFunctions";
import QUERY_KEYS from "../querykeys";

export const useCreatePlaylistMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => createPlaylist(payload),
    mutationKey: [QUERY_KEYS.CREATE_PLAYLIST],
    ...config,
  });

export const usePlaylists = (song_id, limit = 24, offset = 0, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_PLAYLISTS, song_id, limit, offset],
    queryFn: () => getPlaylists({ song_id, limit, offset }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const useAddSongsInPlaylistMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => addSongsInPlaylist(payload),
    mutationKey: [QUERY_KEYS.ADD_SONGS_IN_PLAYLIST],
    ...config,
  });

export const usePlaylistSongs = (id, limit = 24, offset = 0, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_PLAYLIST_SONGS, id, limit, offset],
    queryFn: () => getPlaylistSongs({ id, limit, offset }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const usePlaylistSongsInfinite = (id, limit = 24, config = {}) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_PLAYLIST_SONGS, id],
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistSongs({ id, limit, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return lastPage?.next ? nextOffset : undefined;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });
