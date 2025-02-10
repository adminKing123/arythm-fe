import React from "react";
import authConfigStore from "../../zstore/authConfigStore";
import Button from "../buttons/buttons";
import contextMenuStore from "../../zstore/contextMenuStore";

function AskToAddRequestToAddSong() {
  const user = authConfigStore((state) => state.user);
  const setContextMenuData = contextMenuStore((state) => state.setData);

  if (user)
    return (
      <div className="text-center">
        <h3 className="text-center text-xl mb-5">Couldn't Find Song</h3>
        <Button
          onClick={() =>
            setContextMenuData({
              type: "addrequesttoaddsong",
            })
          }
          className="mb-2"
        >
          Request Song
        </Button>
        <p>Your request will be processed and</p>
        <p>our bots will add the song for you!</p>
      </div>
    );
  return <div className="text-center">No Result Found</div>;
}

export default AskToAddRequestToAddSong;
