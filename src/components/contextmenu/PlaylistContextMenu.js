import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DetailsSvg, ShareSvg } from "../../assets/svg";
import {
  SHARE_APIS,
  useContextMenuCloseHandler,
  useContextPosition,
} from "../../api/utils";
import ContextMenuButton from "./components";
import ROUTES from "../../router/routes";
import { useNavigate } from "react-router-dom";

const PlaylistShareButton = ({ playlist, callback }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(SHARE_APIS.PLAYLIST(playlist.id))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <ContextMenuButton
      Icon={ShareSvg}
      title={copied ? "Copied!" : "Share"}
      onClick={() => {
        callback?.();
        copyToClipboard();
      }}
    />
  );
};

const PlaylistContextMenu = ({ contextMenuData, handleClose }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  useContextMenuCloseHandler(ref, handleClose);
  useContextPosition(ref, contextMenuData, (ele, x, y) => {
    ele.style.left = `${x}px`;
    ele.style.top = `${y}px`;

    ele.classList.remove("opacity-0");
  });

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="bg-[#151515] absolute z-[60] w-[200px] rounded-md shadow-md overflow-hidden opacity-0 transition-opacity duration-200"
    >
      <ContextMenuButton
        Icon={DetailsSvg}
        title={"Details"}
        onClick={() => {
          navigate(ROUTES.GET_PLAYLIST_URI(contextMenuData.playlist.id));
          handleClose();
        }}
      />
      <PlaylistShareButton playlist={contextMenuData.playlist} />
    </div>,
    document.body
  );
};

export default PlaylistContextMenu;
