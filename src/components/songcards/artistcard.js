import { ALink } from "../../components/links/links";
import { get_src_uri } from "../../api/utils";
import styles from "./css/artistcard.module.css";
import { useEffect, useRef } from "react";
import contextMenuStore from "../../zstore/contextMenuStore";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

const ArtistCard = ({ artist }) => {
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const setContextMenuData = contextMenuStore((state) => state.setData);
  const navigate = useNavigate();

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuData({
      type: "artist",
      artist,
      x: e.clientX,
      y: e.clientY,
    });
  };

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
        className={`skeleton relative cursor-pointer flex flex-col items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-[#000] ${styles.artist_cover}`}
        onContextMenu={handleContextMenu}
        onClick={() => navigate(ROUTES.GET_ARTIST_URI(artist.id))}
      >
        <img
          ref={imgRef}
          loading="lazy"
          className="w-full aspect-square opacity-0 transition-opacity duration-500"
          alt={artist.id}
          src={get_src_uri(artist.thumbnail300x300)}
        />
      </div>
      <p className="mt-2 text-center truncate">
        <ALink
          href={ROUTES.GET_ARTIST_URI(artist.id)}
          className="text-white group-hover:text-[#25a56a]"
        >
          {artist.name}
        </ALink>
      </p>
    </div>
  );
};

export const ArtistCardLoading = () => {
  return (
    <div>
      <div className="w-full aspect-square rounded-xl skeleton"></div>
      <div className="w-full mt-2 flex justify-center">
        <div className="w-1/2 rounded h-[16px] skeleton"></div>
      </div>
    </div>
  );
};

export default ArtistCard;
