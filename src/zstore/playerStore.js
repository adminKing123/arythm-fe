import { create } from "zustand";
import authConfigStore from "./authConfigStore";
import { getSong as addToHistory } from "../api/songs/queryFunctions";

const playerStore = create((set) => ({
  song: JSON.parse(localStorage.getItem("last_song")) || null,
  setSong: (song) => {
    if (authConfigStore.getState().user) {
      localStorage.setItem("last_song", JSON.stringify(song));
      addToHistory({ id: song.id });
    }
    set({ song: song });
  },
}));

export default playerStore;
