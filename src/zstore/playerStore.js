import { create } from "zustand";

const playerStore = create((set) => ({
  song: null,
  setSong: (song) => {
    set({ song: song });
  },
}));

export default playerStore;
