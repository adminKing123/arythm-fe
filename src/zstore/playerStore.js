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
  playby: null,

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

  setNextSong: () => {
    const { queue, currentPlayingIndex, setSong } = get();
    if (queue.length) {
      const qIndex =
        currentPlayingIndex === null
          ? 0
          : (currentPlayingIndex + 1) % queue.length;
      setSong(queue[qIndex]);
      set({ currentPlayingIndex: qIndex });
    } else {
      // pass
    }
  },
  setPrevSong: () => {
    const { queue, currentPlayingIndex, setSong } = get();
    if (queue.length) {
      let qIndex = currentPlayingIndex === null ? 0 : currentPlayingIndex - 1;
      if (qIndex < 0) qIndex = queue.length - 1;
      setSong(queue[qIndex]);
      set({ currentPlayingIndex: qIndex });
    } else {
      // pass
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

  // player queue logic
  queue: [],
  currentPlayingIndex: null,
  addSong: (song) =>
    set((state) => ({
      queue: state.queue.some((s) => s.id === song.id)
        ? state.queue
        : [...state.queue, song],
      playby: "queue",
    })),
  removeSong: (index) => {
    set((state) => {
      const updatedQueue = state.queue.filter((_, i) => i !== index);
      const data = {
        queue: updatedQueue,
        currentPlayingIndex:
          index < state.currentPlayingIndex
            ? state.currentPlayingIndex - 1
            : state.currentPlayingIndex,
        playby: updatedQueue.length ? "queue" : null,
      };
      if (updatedQueue.length && index === state.currentPlayingIndex)
        data["song"] = updatedQueue[state.currentPlayingIndex];
      return data;
    });
  },
  setQueueSongWithIndex: (index) => {
    set((state) => {
      if (index < 0 || state.queue.length === 0) return {};
      const qIndex = index % state.queue.length;
      return {
        song: state.queue[qIndex],
        currentPlayingIndex: qIndex,
        playby: "queue",
      };
    });
  },
  clearQueue: () =>
    set({ queue: [], currentPlayingIndex: null, playby: "queue" }),

  // playoption
  playoption: "playlistonce",
  setPlayoption: (value) => set({ playoption: value }),
}));

export default playerStore;
