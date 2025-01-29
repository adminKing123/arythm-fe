import contextMenuStore from "../../zstore/contextMenuStore";
import AddToPlaylistMenu from "./AddToPlaylistMenu";
import AlbumContextMenu from "./AlbumContextMenu";
import ArtistContextMenu from "./ArtistContextMenu";
import SongContextMenu from "./SongContextMenu";

const ContextMenu = () => {
  const contextMenuData = contextMenuStore((state) => state.data);
  const setContextMenuData = contextMenuStore((state) => state.setData);

  const handleClose = (callback) => {
    setContextMenuData(null);
    callback?.();
  };

  if (contextMenuData === null) return null;
  else if (contextMenuData.type === "song")
    return (
      <SongContextMenu
        contextMenuData={contextMenuData}
        handleClose={handleClose}
      />
    );
  else if (contextMenuData.type === "artist")
    return (
      <ArtistContextMenu
        contextMenuData={contextMenuData}
        handleClose={handleClose}
      />
    );
  else if (contextMenuData.type === "album")
    return (
      <AlbumContextMenu
        contextMenuData={contextMenuData}
        handleClose={handleClose}
      />
    );
  else if (contextMenuData.type === "addtoplaylist")
    return <AddToPlaylistMenu contextMenuData={contextMenuData} />;
  else return null;
};

export default ContextMenu;
