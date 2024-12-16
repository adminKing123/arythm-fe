import { useQuery } from "react-query";
import QUERY_KEYS from "../querykeys";
import { getSlides, getSongs } from "./queryFunctions";

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
