import { create } from "zustand";
import authConfigStore from "./authConfigStore";
import { getSong as addToHistory } from "../api/songs/queryFunctions";

const playerStore = create((set) => ({
  song: null,
  setSong: (song) => {
    if (authConfigStore.getState().user) addToHistory({ id: song.id });
    set({ song: song });
  },
}));

export default playerStore;
