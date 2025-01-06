import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AddToQueueSvg, DetailsSvg } from "../../assets/svg";
import playerStore from "../../zstore/playerStore";

const AddToQueueOption = ({ song }) => {
  const addToQueue = playerStore((state) => state.addSong);
  const [songAddedToQueue, setSongAddedToQueue] = useState(false);

  const handleAddToQueue = () => {
    addToQueue(song);
    setSongAddedToQueue(true);
  };

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]"
      onClick={handleAddToQueue}
    >
      <AddToQueueSvg className="fill-white w-[14px] h-[14px]" />
      <span className="text-[14px]">
        {songAddedToQueue ? "Added To Queue" : "Add To Queue"}
      </span>
    </div>
  );
};

const SongContextMenu = ({ contextMenuData, handleClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    const mainContent = document.getElementById("main-content");
    const globalSearchContainer = document.getElementById(
      "global-search-container"
    );
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", () => handleClose());
    mainContent.addEventListener("scroll", () => handleClose());
    globalSearchContainer?.addEventListener("scroll", () => handleClose());

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", () => handleClose());
      mainContent.removeEventListener("scroll", () => handleClose());
      globalSearchContainer?.removeEventListener("scroll", () => handleClose());
    };
  }, [handleClose]);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="bg-[#2b2b2b] absolute z-[1000] w-[200px] rounded-md shadow-md overflow-hidden"
      style={{ top: contextMenuData.y, left: contextMenuData.x }}
    >
      <AddToQueueOption song={contextMenuData.song} />
      <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]">
        <AddToQueueSvg className="fill-white w-[14px] h-[14px]" />
        <span className="text-[14px]">Add To Playlist</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]">
        <DetailsSvg className="fill-white w-[14px] h-[14px]" />
        <span className="text-[14px]">Details</span>
      </div>
    </div>,
    document.body
  );
};

export default SongContextMenu;
