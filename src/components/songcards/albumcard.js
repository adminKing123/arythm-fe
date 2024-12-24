import { ALink } from "../../components/links/links";
import { get_src_uri } from "../../api/utils";
import { useEffect, useRef } from "react";

const AlbumCard = ({ album }) => {
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);

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
    <div className="group">
      <div
        ref={imgContainerRef}
        className={`skeleton relative cursor-pointer flex flex-col items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-[#000]`}
      >
        <img
          ref={imgRef}
          loading="lazy"
          className="absolute top-0 left-0 w-full aspect-square opacity-0 transition-opacity duration-500"
          alt={album.title}
          src={get_src_uri(album.thumbnail300x300)}
        />
      </div>
      <p className="mt-2 text-center truncate">
        <ALink className="text-white group-hover:text-[#25a56a]">
          {album.title}
        </ALink>
      </p>
      <p className="text-center text-sm text-gray-400">{album.year}</p>
    </div>
  );
};

export const AlbumCardLoading = () => {
  return (
    <div>
      <div className="w-full aspect-square rounded-xl skeleton"></div>
      <div className="w-full mt-2 flex justify-center">
        <div className="w-3/4 rounded h-[16px] skeleton"></div>
      </div>
      <div className="w-full mt-2 flex justify-center">
        <div className="w-1/3 rounded h-[12px] skeleton"></div>
      </div>
    </div>
  );
};

export default AlbumCard;
