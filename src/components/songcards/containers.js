import { useGetSongsLatestRelease } from "../../api/songs/queryHooks";
import { NextLink } from "../links/links";
import SongCard, { SongCardLoading } from "./songcard";

export const NewRelesese = () => {
  const { isLoading, isError, data } = useGetSongsLatestRelease();

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">New Releases</h2>
        <NextLink className="text-[16px]">See All</NextLink>
      </div>
      {isLoading || isError ? (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {Array.from({ length: 12 }, (_, index) => (
            <SongCardLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {data.results.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </>
  );
};
