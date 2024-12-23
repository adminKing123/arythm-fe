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
          backgroundImage: `url("${get_src_uri(playlist.thumbnail)}")`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold truncate">
            {playlist.name}
          </h3>
          <p className="text-gray-300 text-sm">
            {numeral(playlist.songs_count)} songs •{" "}
            <b>{playlist.privacy_type}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export const PlaylistCardLibraryLoading = () => {
  return <div className="w-full skeleton aspect-square rounded-xl"></div>;
};

export default PlaylistCardLibrary;
