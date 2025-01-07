import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AddToQueueSvg, DetailsSvg } from "../../assets/svg";
import playerStore from "../../zstore/playerStore";
import {
  useContextMenuCloseHandler,
  useContextPosition,
} from "../../api/utils";
import ContextMenuButton from "./components";

const AddToQueueOption = ({ song }) => {
  const addToQueue = playerStore((state) => state.addSong);
  const [songAddedToQueue, setSongAddedToQueue] = useState(false);

  const handleAddToQueue = () => {
    addToQueue(song);
    setSongAddedToQueue(true);
  };

  return (
    <ContextMenuButton
      Icon={AddToQueueSvg}
      title={songAddedToQueue ? "Added To Queue" : "Add To Queue"}
      onClick={handleAddToQueue}
    />
  );
};

const SongContextMenu = ({ contextMenuData, handleClose }) => {
  const ref = useRef(null);

  useContextMenuCloseHandler(ref, handleClose);
  useContextPosition(ref, contextMenuData, (ele, x, y) => {
    ele.style.left = `${x}px`;
    ele.style.top = `${y}px`;

    ele.classList.remove("opacity-0");
  });

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="bg-[#151515] absolute z-[1000] w-[200px] rounded-md shadow-md overflow-hidden opacity-0 transition-opacity duration-200"
    >
      <AddToQueueOption song={contextMenuData.song} />

      <ContextMenuButton Icon={AddToQueueSvg} title={"Add To Playlist"} />
      <ContextMenuButton Icon={DetailsSvg} title={"Details"} />
    </div>,
    document.body
  );
};

export default SongContextMenu;
