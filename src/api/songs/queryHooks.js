import { useQuery } from "react-query";
import QUERY_KEYS from "../querykeys";
import {
  getAlbums,
  getArtists,
  getFilteredSongs,
  getGlobalSearch,
  getLatestPlaylists,
  getMoreRelatedSongs,
  getSlides,
  getSong,
  getSongs,
  getSongsHistory,
} from "./queryFunctions";

export const useGetSlides = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_SLIDES],
    queryFn: () => getSlides(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useGetSongsLatestRelease = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_SONGS_LATEST_RELEASE],
    queryFn: () => getSongs(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useGetHeroArtists = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_HERO_ARTISTS],
    queryFn: () => getArtists(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useGetLatestSongsFromHistory = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_LATEST_SONGS_FROM_HISTORY],
    queryFn: () => getSongsHistory(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const useGetLatestPlaylists = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.LATEST_PLAYLISTS],
    queryFn: () => getLatestPlaylists(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const useGlobalSearch = (q, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GLOBAL_SEARCH, q],
    queryFn: () => getGlobalSearch({ q }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const useFilteredSongs = (
  q,
  searchBy,
  sortBy,
  limit = 24,
  offset = 0,
  config = {}
) =>
  useQuery({
    queryKey: [QUERY_KEYS.FILTER, q, searchBy, sortBy, limit, offset],
    queryFn: () => getFilteredSongs({ q, searchBy, sortBy, limit, offset }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });

export const useFilteredArtists = (q, limit = 24, offset = 0, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.FILTER_ARTISTS, q, limit, offset],
    queryFn: () =>
      getArtists({
        q,
        limit,
        offset,
      }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useFilteredAlbums = (q, limit = 24, offset = 0, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.FILTER_ALBUMS, q, limit, offset],
    queryFn: () =>
      getAlbums({
        q,
        limit,
        offset,
      }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useGetSong = (id, justget = false, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_SONG, id, justget],
    queryFn: () =>
      getSong({
        id,
        justget,
      }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useMoreRelatedSongs = (id, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_MORE_RELATED_SONGS, id],
    queryFn: () =>
      getMoreRelatedSongs({
        id,
      }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });
