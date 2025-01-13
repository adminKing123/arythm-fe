import { useRef } from "react";
import ReactDOM from "react-dom";
import { DetailsSvg } from "../../assets/svg";
import {
  useContextMenuCloseHandler,
  useContextPosition,
} from "../../api/utils";
import ContextMenuButton from "./components";

const AlbumContextMenu = ({ contextMenuData, handleClose }) => {
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
      className="bg-[#151515] absolute z-20 w-[200px] rounded-md shadow-md overflow-hidden opacity-0 transition-opacity duration-200"
    >
      <ContextMenuButton Icon={DetailsSvg} title={"Details"} />
    </div>,
    document.body
  );
};

export default AlbumContextMenu;
