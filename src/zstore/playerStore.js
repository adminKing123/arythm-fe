import { create } from "zustand";
import authConfigStore from "./authConfigStore";
import { getSong as addToHistory } from "../api/songs/queryFunctions";
import { setSongMetaData } from "../api/utils";

const playerStore = create((set) => ({
  song: JSON.parse(localStorage.getItem("last_song")) || null,
  setSong: (song) => {
    if (authConfigStore.getState().user) {
      localStorage.setItem("last_song", JSON.stringify(song));
      addToHistory({ id: song.id });
    }
    set({ song: song });
    setSongMetaData(song);
  },
}));

export default playerStore;
