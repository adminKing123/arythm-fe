import { useQuery } from "react-query";
import QUERY_KEYS from "../querykeys";
import {
  getArtists,
  getGlobalSearch,
  getLatestPlaylists,
  getSlides,
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
