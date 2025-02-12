import { useInfiniteQuery, useQuery } from "react-query";
import QUERY_KEYS from "../querykeys";
import { getArtist, getArtistSongs } from "./queryFunctions";

export const useGetArtist = (id, config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_ARTIST, id],
    queryFn: () =>
      getArtist({
        id,
      }),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...config,
  });

export const useArtistSongsInfinite = (id, limit = 24, config = {}) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_ARTIST_SONGS, id],
    queryFn: ({ pageParam = 0 }) =>
      getArtistSongs({ id, limit, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return lastPage?.next ? nextOffset : undefined;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });
