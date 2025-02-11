import { useEffect, useRef } from "react";
import { get_src_uri, numeral } from "../../api/utils";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

const PlaylistCardLibrary = ({ playlist, onClick }) => {
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const imgEle = imgRef.current;
    const imgContainerEle = imgContainerRef.current;

    const handleLoaded = () => {
      imgEle.classList.remove("opacity-0");
      imgContainerEle.classList.remove("skeleton");
    };

    if (imgEle && imgContainerRef) {
      if (imgEle.complete) handleLoaded();
      else imgEle.addEventListener("load", handleLoaded);

      return () => {
        imgEle.removeEventListener("load", handleLoaded);
      };
    }
  }, [imgRef, imgContainerRef]);

  return (
    <div
      key={playlist.id}
      className="relative rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow"
      onClick={(e) => {
        onClick?.();
        navigate(ROUTES.GET_PLAYLIST_URI(playlist.id));
      }}
    >
      <div ref={imgContainerRef} className="skeleton w-full aspect-square">
        <img
          ref={imgRef}
          loading="lazy"
          src={get_src_uri(playlist.thumbnail)}
          alt={playlist.name}
          className="opacity-0 w-full aspect-square bg-cover bg-center group-hover:scale-[1.08] transition-transform duration-300"
          onContextMenu={(e) => e.preventDefault()}
        ></img>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold truncate lg:text-base sm:text-sm text-xs">
            {playlist.name}
          </h3>
          <p className="text-gray-300 lg:text-sm text-xs">
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
