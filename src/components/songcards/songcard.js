import { ALink, ArtistsLinks } from "../../components/links/links";
import { get_src_uri, numeral } from "../../api/utils";
import { HeadphoneSvg, PlaylistsSvg, PlaySvg } from "../../assets/svg";
import { Link } from "react-router-dom";
import playerStore from "../../zstore/playerStore";
import { useEffect, useRef } from "react";

const SongCard = ({ song, setCallback }) => {
  const setSong = playerStore((state) => state.setSong);

  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const imgEle = imgRef.current;
    const imgContainerEle = imgContainerRef.current;

    const handleLoaded = () => {
      imgEle.classList.remove("opacity-0");
      imgContainerEle.classList.remove("skeleton");
      imgContainerEle.classList.add("group-hover:opacity-[0.6]");
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
    <div>
      <div
        ref={imgContainerRef}
        className="skeleton relative flex flex-col items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-[#000] group"
      >
        <img
          ref={imgRef}
          loading="lazy"
          className="opacity-0 absolute top-0 left-0 w-full aspect-square group-hover:scale-[1.08] transition-all duration-500"
          alt={song.album.id}
          src={get_src_uri(song.album.thumbnail300x300)}
        />
        <Link
          onClick={() => {
            setSong(song);
            setCallback?.(song);
          }}
          className="flex justify-center items-center w-10 h-10 rounded-lg sm:w-14 sm:h-14 sm:rounded-xl bg-[#222227] relative scale-[0.8] opacity-0 group-hover:scale-[1] group-hover:opacity-100 transition-all duration-500"
        >
          <PlaySvg className="w-5 h-5 fill-white sm:w-6 sm:h-6" />
        </Link>
        <span className="absolute flex items-center justify-center w-full bottom-1 sm:bottom-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Link className="text-white fill-white text-[13px] mr-[15px] flex items-center gap-1">
            <PlaylistsSvg className="w-[13px] h-[13px]" />
            {song?.playlists_count || 0}
          </Link>
          <Link className="text-white fill-white text-[13px] mr-[15px] flex items-center gap-1">
            <HeadphoneSvg className="w-[13px] h-[13px]" />
            {numeral(song.count)}
          </Link>
        </span>
      </div>
      <p className="mt-2 text-white truncate">
        <ALink>{song.original_name}</ALink>
      </p>
      <p className="text-sm truncate">
        <ArtistsLinks artists={song.artists} />
      </p>
    </div>
  );
};

export const SongCardLoading = () => {
  return (
    <div>
      <div className="w-full aspect-square rounded-xl skeleton"></div>
      <div className="w-1/2 rounded h-[16px] mt-2 skeleton"></div>
      <div className="w-3/4 rounded skeleton h-[10px]"></div>
    </div>
  );
};

export default SongCard;
