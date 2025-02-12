import React, { useState } from "react";
import ReactDOM from "react-dom";
import contextMenuStore from "../../zstore/contextMenuStore";
import Input from "../Inputs/inputs";
import Button from "../buttons/buttons";
import {
  useAddSongsInPlaylistMutation,
  useCreatePlaylistMutation,
  usePlaylists,
} from "../../api/playlists/queryHooks";
import { get_src_uri, getParamFromUrl, numeral } from "../../api/utils";

const PlatlistListWithAddButton = ({ contextMenuData }) => {
  const setContextMenuData = contextMenuStore((state) => state.setData);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isFetching, isError } = usePlaylists(
    contextMenuData?.song?.id || "",
    limit,
    offset
  );
  const {
    mutate,
    isLoading: isAdding,
    isError: isErrorInAdding,
  } = useAddSongsInPlaylistMutation({
    onSuccess: () => {
      setContextMenuData(null);
    },
    onError: () => {
      setContextMenuData(null);
    },
  });

  const handleAddSongToPlaylist = (playlist) => {
    let songs_id = [];

    if (contextMenuData?.songs_id?.length) songs_id = contextMenuData.songs_id;
    else songs_id = [contextMenuData.song.id];
    mutate({
      id: playlist.id,
      songs_id,
    });
  };
  const handlePageChange = (url) => {
    const gotoffset = parseInt(getParamFromUrl(url, "offset")) || 0;
    setOffset(gotoffset);
  };

  if (isError || isErrorInAdding) return <div>Something went wrong</div>;

  if (isLoading || isFetching)
    return (
      <div>
        {Array.from({ length: limit }, (_, i) => (
          <div key={i} className="w-full h-14 skeleton py-2 px-3"></div>
        ))}
      </div>
    );

  return (
    <div>
      {data?.results?.length ? (
        <>
          <h3 className="px-3 text-xl mb-2">Your Playlist</h3>
          <ul>
            {data.results.map((playlist) => (
              <li
                key={playlist.id}
                className={`flex items-center gap-3 py-2 px-3 cursor-pointer ${
                  playlist.contains_song || isAdding
                    ? "opacity-50"
                    : "hover:bg-[#303030]"
                }`}
                onClick={
                  playlist.contains_song || isAdding
                    ? null
                    : () => handleAddSongToPlaylist(playlist)
                }
              >
                <img
                  src={get_src_uri(playlist.thumbnail)}
                  className="w-10 h-10 rounded"
                  alt="thumbnail"
                  onContextMenu={(e) => e.preventDefault()}
                ></img>
                <div className="flex-grow truncate">
                  <h3 className="truncate">{playlist.name}</h3>
                  <p className="text-xs truncate">
                    {numeral(playlist.songs_count)} songs • {playlist.privacy_type}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="text-center">
          You don't have any playlist yet, create one!
        </div>
      )}
      {!isError &&
      !isLoading &&
      !isFetching &&
      (data?.next || data?.previous) ? (
        <div className="flex justify-center items-center gap-5 mt-8">
          <button
            className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
            disabled={data.previous === null}
            onClick={() => handlePageChange(data.previous)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded-lg hover:bg-[#1e1e1e] disabled:opacity-50"
            disabled={data.next === null}
            onClick={() => handlePageChange(data.next)}
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

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
    let songs_id = [];

    if (contextMenuData?.songs_id?.length) songs_id = contextMenuData.songs_id;
    else songs_id = [contextMenuData.song.id];
    mutate({
      name: playlistName,
      songs_id,
      privacy_type: "Public",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 flex-wrap justify-center"
    >
      <Input
        placeholder="Enter Playlist Name"
        value={playlistName}
        onChange={(e) => setPlatlistName(e.target.value)}
        className="min-w-[200px] max-w-[300px]"
      ></Input>
      <Button
        type="submit"
        className="flex-shrink-0"
        disabled={isLoading || isError || playlistName.length === 0}
      >
        {isLoading ? "Creating and adding song" : "Create playlist & add song"}
      </Button>
    </form>
  );
};

const AddToPlaylistMenu = ({ contextMenuData }) => {
  const setContextMenuData = contextMenuStore((state) => state.setData);
  return ReactDOM.createPortal(
    <div
      className="bg-[#0000009c] fixed top-0 left-0 z-[60] w-screen h-screen flex justify-center items-center"
      onClick={() => setContextMenuData(null)}
    >
      <div
        className="bg-[#272727] min-w-[240px] max-w-[580px] w-full p-5 rounded-lg mx-10"
        onClick={(e) => e.stopPropagation()}
      >
        <PlatlistListWithAddButton contextMenuData={contextMenuData} />
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
