import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AddToQueueSvg, DetailsSvg } from "../../assets/svg";
import playerStore from "../../zstore/playerStore";
import { useContextMenuCloseHandler } from "../../api/utils";

const SongContextMenuButton = ({
  title,
  Icon,
  className,
  iconClassName = "fill-white w-[14px] h-[14px]",
  titleClassName = "text-[14px]",
  ...props
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#222222] ${
        className ?? ""
      }`}
      {...props}
    >
      <Icon className={iconClassName} />
      <span className={titleClassName}>{title}</span>
    </div>
  );
};

const AddToQueueOption = ({ song }) => {
  const addToQueue = playerStore((state) => state.addSong);
  const [songAddedToQueue, setSongAddedToQueue] = useState(false);

  const handleAddToQueue = () => {
    addToQueue(song);
    setSongAddedToQueue(true);
  };

  return (
    <SongContextMenuButton
      Icon={AddToQueueSvg}
      title={songAddedToQueue ? "Added To Queue" : "Add To Queue"}
      onClick={handleAddToQueue}
    />
  );
};

const SongContextMenu = ({ contextMenuData, handleClose }) => {
  const ref = useRef(null);

  useContextMenuCloseHandler(ref, handleClose);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="bg-[#151515] absolute z-[1000] w-[200px] rounded-md shadow-md overflow-hidden"
      style={{ top: contextMenuData.y, left: contextMenuData.x }}
    >
      <AddToQueueOption song={contextMenuData.song} />

      <SongContextMenuButton Icon={AddToQueueSvg} title={"Add To Playlist"} />
      <SongContextMenuButton Icon={DetailsSvg} title={"Details"} />
    </div>,
    document.body
  );
};

export default SongContextMenu;
