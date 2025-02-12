import { useInfiniteQuery } from "react-query";
import QUERY_KEYS from "../querykeys";
import { getAlbumSongs } from "./queryFunctions";

export const useAlbumSongsInfinite = (id, limit = 24, config = {}) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_ALBUM_SONGS, id],
    queryFn: ({ pageParam = 0 }) =>
      getAlbumSongs({ id, limit, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return lastPage?.next ? nextOffset : undefined;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    ...config,
  });
