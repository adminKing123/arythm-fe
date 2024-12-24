import { create } from "zustand";
import authConfigStore from "./authConfigStore";
import {
  getSong as addToHistory,
  likeSong,
  removeFromlikedSong,
} from "../api/songs/queryFunctions";
import { setSongMetaData } from "../api/utils";

const already_selected_song = JSON.parse(localStorage.getItem("last_song"));
if (already_selected_song) setSongMetaData(already_selected_song);

const playerStore = create((set, get) => ({
  song: already_selected_song || null,
  isLiked: localStorage.getItem("last_song_liked") === "0" ? false : true,
  addingInLiked: false,
  addingInHistory: false,

  loadingSongFromURI: false,
  setLoadingSongFromURI: (value) => {
    set({ loadingSongFromURI: value });
  },

  setSong: async (song) => {
    const prevSong = get().song;
    set({ song: song });
    setSongMetaData(song);
    if (authConfigStore.getState().user && prevSong?.id !== song.id) {
      localStorage.setItem("last_song", JSON.stringify(song));

      set({ addingInHistory: true });
      const response = await addToHistory({ id: song.id });
      set({ addingInHistory: false });

      set({ isLiked: response.liked });

      localStorage.setItem("last_song_liked", response.liked ? "1" : "0");
    }
  },
  setLike: async (bool) => {
    const selected_song = get().song;
    const IsAddingInLiked = get().addingInLiked;

    if (!IsAddingInLiked) {
      set({ isLiked: bool, addingInLiked: true });
      if (bool) await likeSong({ id: selected_song.id });
      else removeFromlikedSong({ id: selected_song.id });
      localStorage.setItem("last_song_liked", bool ? "1" : "0");
      set({ addingInLiked: false });
    }
  },
}));

export default playerStore;
