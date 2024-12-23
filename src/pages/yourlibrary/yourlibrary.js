import authConfigStore from "../../zstore/authConfigStore";
import ROUTES from "../../router/routes";
import { LibraryLatestHistorySongs } from "../../components/carousals/libraryHistorSongsCarousal";
import { useEffect } from "react";
import { NextLink } from "../../components/links/links";
import Button from "../../components/buttons/buttons";
import { get_src_uri, numeral } from "../../api/utils";

const PlaylistCardLibrary = ({ playlist }) => {
  return (
    <div
      key={playlist.id}
      className="relative rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow"
    >
      <div
        className="w-full aspect-square bg-cover bg-center group-hover:scale-[1.08] transition-transform duration-300"
        style={{
          backgroundImage: `url("${get_src_uri(playlist.thumbnail300x300)}")`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold truncate">
            {playlist.name}
          </h3>
          <p className="text-gray-300 text-sm">
            {numeral(playlist.count)} songs •{" "}
            <b>{playlist.isPrivate ? "Private" : "Public"}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export const LibraryPlaylists = () => {
  const playlistsData = [
    {
      id: 1,
      name: "Liked Songs",
      count: 2,
      thumbnail300x300: "album-images/300x300/HUSN%20-%20Husn%20%282024%29.png",
      isPrivate: true,
    },
    {
      id: 2,
      name: "Saved for Later",
      count: 4,
      thumbnail300x300:
        "album-images/300x300/ND%20-%20Night%20Drive%20%282022%29.png",
      isPrivate: true,
    },
    {
      id: 3,
      name: "Only Sad Songs",
      count: 214,
      thumbnail300x300: "album-images/300x300/Aalas%20Ka%20Pedh.png",
      isPrivate: false,
    },
    {
      id: 4,
      name: "2001-16 Best Songs",
      count: 514,
      thumbnail300x300:
        "album-images/300x300/APKGK%20-%20Ajab%20Prem%20Ki%20Ghazab%20Kahani%20(2009).jpg",
      isPrivate: false,
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-white text-[30px]">Playlists</h2>
        <div className="flex items-center gap-2">
          <Button varient="secondary">Add Playlist</Button>
          <NextLink className="text-[16px] text-nowrap">See All</NextLink>
        </div>
      </div>
      <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {playlistsData.map((playlist) => {
          if (playlist.count === 0) return null;
          return <PlaylistCardLibrary playlist={playlist} />;
        })}
      </div>
    </>
  );
};

const YourLibrary = () => {
  const user = authConfigStore((state) => state.user);

  useEffect(() => {
    document.title = "Your Library";
  }, []);

  if (!user) {
    alert("Please Login To Access This Page!");
    window.location = ROUTES.LOGIN;
    return;
  }

  return (
    <>
      <section className="p-[30px]">
        <LibraryLatestHistorySongs />
      </section>
      <section className="p-[30px]">
        <LibraryPlaylists />
      </section>
    </>
  );
};

export default YourLibrary;
