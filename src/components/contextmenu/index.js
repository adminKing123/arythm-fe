import contextMenuStore from "../../zstore/contextMenuStore";
import AddRequestToAddSongMenu from "./AddRequestToAddSongMenu";
import AddToPlaylistMenu from "./AddToPlaylistMenu";
import AlbumContextMenu from "./AlbumContextMenu";
import ArtistContextMenu from "./ArtistContextMenu";
import PlaylistContextMenu from "./PlaylistContextMenu";
import SongContextMenu from "./SongContextMenu";

const ContextMenu = () => {
  const contextMenuData = contextMenuStore((state) => state.data);
  const setContextMenuData = contextMenuStore((state) => state.setData);

  const handleClose = (callback) => {
    setContextMenuData(null);
    if (typeof callback === "function") callback?.();
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
  else if (contextMenuData.type === "playlist")
    return (
      <PlaylistContextMenu
        contextMenuData={contextMenuData}
        handleClose={handleClose}
      />
    );
  else if (contextMenuData.type === "addtoplaylist")
    return <AddToPlaylistMenu contextMenuData={contextMenuData} />;
  else if (contextMenuData.type === "addrequesttoaddsong")
    return <AddRequestToAddSongMenu contextMenuData={contextMenuData} />;
  else return null;
};

export default ContextMenu;
