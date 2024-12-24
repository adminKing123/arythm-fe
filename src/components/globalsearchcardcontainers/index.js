import AlbumCard, { AlbumCardLoading } from "../songcards/albumcard";
import ArtistCard, { ArtistCardLoading } from "../songcards/artistcard";
import PlaylistCardLibrary, {
  PlaylistCardLibraryLoading,
} from "../songcards/playlistcard";
import SongCard, { SongCardLoading } from "../songcards/songcard";

export const ShowHistoryGR = ({ data, isLoading }) => {
  if (data.length === 0) return;
  return isLoading ? (
    <div className="grid gap-[30px] sm:grid-cols-3 grid-cols-2 mt-[20px]">
      {Array.from({ length: 4 }, (_, index) => (
        <SongCardLoading key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">Top Results</h2>
      </div>
      <div className="w-[200px] mt-2">
        <SongCard song={data[0].song} />
      </div>
      <div className="grid gap-[30px] mt-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {data.slice(1).map((item) => {
          const song = item.song;
          return <SongCard key={song.id} song={song} />;
        })}
      </div>
      <div className="my-[20px]"></div>
    </>
  );
};

export const ShowSongsGR = ({ title = "Featuring", data, isLoading }) => {
  if (data.length === 0) return;
  return isLoading ? (
    <div className="grid gap-[30px] md:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-[20px]">
      {Array.from({ length: 4 }, (_, index) => (
        <SongCardLoading key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">{title}</h2>
      </div>
      <div className="grid gap-[30px] mt-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {data.map((song) => {
          return <SongCard key={song.id} song={song} />;
        })}
      </div>
      <div className="my-[20px]"></div>
    </>
  );
};

export const ShowPlaylistsGR = ({ data, isLoading }) => {
  if (data.length === 0) return;
  return isLoading ? (
    <div className="grid gap-[30px] sm:grid-cols-3 grid-cols-2 mt-[20px]">
      {Array.from({ length: 4 }, (_, index) => (
        <PlaylistCardLibraryLoading key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">Playlists</h2>
      </div>
      <div className="grid gap-[30px] mt-4 sm:grid-cols-3 grid-cols-2">
        {data.map((playlist) => {
          return <PlaylistCardLibrary key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </>
  );
};

export const ShowArtistsGR = ({ title = "Artists", data, isLoading }) => {
  if (data.length === 0) return;
  return isLoading ? (
    <div className="grid gap-[30px] md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
      {Array.from({ length: 4 }, (_, index) => (
        <ArtistCardLoading key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">{title}</h2>
      </div>
      <div className="grid gap-[30px] mt-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {data.map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </div>
      <div className="my-[20px]"></div>
    </>
  );
};

export const ShowAlbumGR = ({ title = "Albums", data, isLoading }) => {
  if (data.length === 0) return;
  return isLoading ? (
    <div className="grid gap-[30px] md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
      {Array.from({ length: 4 }, (_, index) => (
        <AlbumCardLoading key={index} />
      ))}
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">{title}</h2>
      </div>
      <div className="grid gap-[30px] mt-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {data.map((album) => {
          return <AlbumCard key={album.id} album={album} />;
        })}
      </div>
      <div className="my-[20px]"></div>
    </>
  );
};
