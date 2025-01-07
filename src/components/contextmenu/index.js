import contextMenuStore from "../../zstore/contextMenuStore";
import SongContextMenu from "./SongContextMenu";

const ContextMenu = () => {
  const contextMenuData = contextMenuStore((state) => state.data);
  const setContextMenuData = contextMenuStore((state) => state.setData);

  const handleClose = (callback) => {
    setContextMenuData(null);
    callback?.();
  };

  if (contextMenuData === null) return null;
  if (contextMenuData.type === "song") {
    // const { x, y } = contextMenuData;
    // const menuWidth = 200; // Width of the context menu
    // const menuHeight = 111; // Height of the context menu
    // const viewportWidth = window.innerWidth;
    // const viewportHeight = window.innerHeight;

    // // Adjust x position if it's too far to the right
    // const adjustedX =
    //   x + menuWidth > viewportWidth ? viewportWidth - menuWidth - 10 : x;

    // // Adjust y position if it's too far down
    // const adjustedY =
    //   y + menuHeight > viewportHeight ? viewportHeight - menuHeight - 10 : y;

    // const adjustedContextMenuData = {
    //   ...contextMenuData,
    //   x: adjustedX,
    //   y: adjustedY,
    // };

    return (
      <SongContextMenu
        contextMenuData={contextMenuData}
        handleClose={handleClose}
      />
    );
  }
  return null;
};

export default ContextMenu;
