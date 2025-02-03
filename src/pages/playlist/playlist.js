import React, { useEffect } from "react";
import { usePlaylistSongsInfinite } from "../../api/playlists/queryHooks";
import { useParams } from "react-router-dom";
import { get_src_uri } from "../../api/utils";
import SongCard from "../../components/songcards/songcard";

const PlaylistHeader = ({ playlist }) => {
  return (
    <section className="p-5 flex items-end gap-6 relative bg-black">
      <img
        alt="thumbnail"
        src={get_src_uri(playlist.thumbnail)}
        className="object-cover w-full h-full absolute top-0 left-0 blur-3xl"
      />
      <div className="w-64 rounded overflow-hidden relative">
        <img alt="thumbnail" src={get_src_uri(playlist.thumbnail)} />
      </div>
      <div className="relative mb-2">
        <p className="text-white text-xs ml-1">
          Playlist • <span className="text-white">{playlist.privacy_type}</span>
        </p>
        <h3 className="text-6xl font-bold text-white">{playlist.name}</h3>
        <p className="text-white text-sm">
          <span className="text-white">@{playlist.author.username}</span> •{" "}
          {playlist.songs_count} songs
        </p>
      </div>
    </section>
  );
};

const SongsList = ({ data }) => {
  return (
    <div className="grid gap-[30px] mt-8 lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-5">
      {data.map((page, index) => (
        <React.Fragment key={index}>
          {page.results.map((playlist_song) => (
            <SongCard key={playlist_song.id} song={playlist_song.song} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const Playlist = () => {
  document.title = "Playlist";
  const id = parseInt(useParams().id);
  const {
    isError,
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePlaylistSongsInfinite(id, 24, {
    cacheTime: 0,
  });

  useEffect(() => {
    const handleScroll = (e) => {
      const bottom =
        e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) return <div>Playlist not found</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <>
      <PlaylistHeader playlist={data.pages[0].playlist} />
      <section>
        <SongsList data={data.pages} />
      </section>
    </>
  );
};

export default Playlist;
