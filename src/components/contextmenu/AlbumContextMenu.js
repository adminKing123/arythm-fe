import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { DetailsSvg, ShareSvg } from "../../assets/svg";
import {
  SHARE_APIS,
  useContextMenuCloseHandler,
  useContextPosition,
} from "../../api/utils";
import ContextMenuButton from "./components";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routes";

const AlbumShareButton = ({ album, callback }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(SHARE_APIS.ALBUM(album.id))
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

const AlbumContextMenu = ({ contextMenuData, handleClose }) => {
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
          navigate(ROUTES.GET_ALBUM_URI(contextMenuData.album.id));
          handleClose();
        }}
      />
      <AlbumShareButton album={contextMenuData.album} />
    </div>,
    document.body
  );
};

export default AlbumContextMenu;
