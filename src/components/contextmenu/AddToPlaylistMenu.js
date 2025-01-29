import React, { useState } from "react";
import ReactDOM from "react-dom";
import contextMenuStore from "../../zstore/contextMenuStore";
import Input from "../Inputs/inputs";
import Button from "../buttons/buttons";
import { useCreatePlaylistMutation } from "../../api/playlists/queryHooks";

const CreatePlaylistnAddSong = ({ contextMenuData }) => {
  const setContextMenuData = contextMenuStore((state) => state.setData);
  const { mutate, isLoading, isError } = useCreatePlaylistMutation({
    onSuccess: () => {
      setContextMenuData(null);
    },
    onError: () => {
      setContextMenuData(null);
    },
  });
  const [playlistName, setPlatlistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name: playlistName,
      songs_id: [contextMenuData.song.id],
      privacy_type: "Public",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <Input
        placeholder="Enter Playlist Name"
        value={playlistName}
        onChange={(e) => setPlatlistName(e.target.value)}
      ></Input>
      <Button
        type="submit"
        className="flex-shrink-0"
        disabled={isLoading || isError || playlistName.length === 0}
      >
        Create playlist & add song
      </Button>
    </form>
  );
};

const AddToPlaylistMenu = ({ contextMenuData }) => {
  const setContextMenuData = contextMenuStore((state) => state.setData);
  return ReactDOM.createPortal(
    <div
      className="bg-[#0000009c] absolute top-0 left-0 z-[60] w-screen h-screen flex justify-center items-center"
      onClick={() => setContextMenuData(null)}
    >
      <div
        className="bg-[#272727] min-w-[240px] max-w-[580px] w-full p-5 rounded-lg mx-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 my-3">
          <span className="flex-grow border border-[#303030]"></span>
          <span>or</span>
          <span className="flex-grow border border-[#303030]"></span>
        </div>
        <CreatePlaylistnAddSong contextMenuData={contextMenuData} />
      </div>
    </div>,
    document.body
  );
};

export default AddToPlaylistMenu;
