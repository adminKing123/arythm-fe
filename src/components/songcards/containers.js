import {
  useGetLatestPlaylists,
  useGetSongsLatestRelease,
} from "../../api/songs/queryHooks";
import Button from "../buttons/buttons";
import { HeroArtistsCarousal } from "../carousals";
import { NextLink } from "../links/links";
import PlaylistCardLibrary, {
  PlaylistCardLibraryLoading,
} from "./playlistcard";
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

export const HeroArtists = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap mb-8">
        <h2 className="text-white text-[30px]">Artists</h2>
        <NextLink className="text-[16px]">See All</NextLink>
      </div>
      <HeroArtistsCarousal />
    </>
  );
};

export const LibraryPlaylists = () => {
  const { isLoading, isError, data: playlistsData } = useGetLatestPlaylists();

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">Playlists</h2>
        <div className="flex items-center gap-2">
          <Button varient="secondary">Add Playlist</Button>
          <NextLink className="text-[16px] text-nowrap">See All</NextLink>
        </div>
      </div>

      {isLoading || isError ? (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <PlaylistCardLibraryLoading key={index} />
          ))}
        </div>
      ) : playlistsData.length ? (
        <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
          {playlistsData.map((playlist) => {
            return <PlaylistCardLibrary playlist={playlist} />;
          })}
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h3 className="text-xl text-white mb-1">No Playlists Found</h3>
            <p className="text-gray-400 mb-2">
              Looks like you don't have any playlists yet. Add your first one!
            </p>
            <Button>Add Playlist</Button>
          </div>
        </div>
      )}
    </>
  );
};
