import { create } from "zustand";
import authConfigStore from "./authConfigStore";
import {
  getSong as addToHistory,
  likeSong,
  removeFromlikedSong,
} from "../api/songs/queryFunctions";
import { getRandomIndex, setSongMetaData } from "../api/utils";

const already_selected_song = JSON.parse(localStorage.getItem("last_song"));
if (already_selected_song) setSongMetaData(already_selected_song);

const playerStore = create((set, get) => ({
  song: already_selected_song || null,
  isLiked: localStorage.getItem("last_song_liked") === "0" ? false : true,
  addingInLiked: false,
  addingInHistory: false,
  playby: null,

  playoption: "playlistonce",
  setPlayoption: (value) => set({ playoption: value }),

  loadingSongFromURI: false,
  setLoadingSongFromURI: (value) => {
    set({ loadingSongFromURI: value });
  },

  setSong: async (song, shouldAddToHistory = true) => {
    const prevSong = get().song;
    set({ song: song });
    setSongMetaData(song);
    if (
      authConfigStore.getState().user &&
      prevSong?.id !== song.id &&
      shouldAddToHistory
    ) {
      localStorage.setItem("last_song", JSON.stringify(song));

      set({ addingInHistory: true });
      const response = await addToHistory({ id: song.id });
      set({ addingInHistory: false });

      set({ isLiked: response.liked });

      localStorage.setItem("last_song_liked", response.liked ? "1" : "0");
    }
  },

  setNextSong: (playerRef) => {
    const { playby, getNextFromQueue, playoption, repeatSong } = get();
    if (playoption === "repeat") repeatSong(playerRef);
    else if (playby === "queue") getNextFromQueue();
  },
  setPrevSong: (playerRef) => {
    const { playby, getPrevFromQueue, playoption, repeatSong } = get();
    if (playoption === "repeat") repeatSong(playerRef);
    else if (playby === "queue") getPrevFromQueue();
  },
  repeatSong: (playerRef) => {
    const audioElement = playerRef.current?.audio?.current;
    console.log("wow");
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
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
        state.setSong(updatedQueue[state.currentPlayingIndex]);
      return data;
    });
  },
  setQueueSongWithIndex: (index) => {
    set((state) => {
      if (index < 0 || state.queue.length === 0) return {};
      const qIndex = index % state.queue.length;
      state.setSong(state.queue[qIndex]);
      return {
        song: state.queue[qIndex],
        currentPlayingIndex: qIndex,
        playby: "queue",
      };
    });
  },
  clearQueue: () =>
    set({ queue: [], currentPlayingIndex: null, playby: "queue" }),

  getNextFromQueue: () => {
    set((state) => {
      let qIndex = 0;
      qIndex =
        state.currentPlayingIndex === null ? 0 : state.currentPlayingIndex + 1;

      let songToBeUpdated = null;
      if (state.playoption === "playlistonce") {
        if (qIndex >= 0 && qIndex < state.queue.length)
          songToBeUpdated = state.queue[qIndex];
      } else if (state.playoption === "repeatplaylist") {
        qIndex = qIndex % state.queue.length;
        songToBeUpdated = state.queue[qIndex];
      } else if (state.playoption === "random") {
        qIndex = getRandomIndex(state.queue.length, qIndex);
        songToBeUpdated = state.queue[qIndex];
      }
      if (songToBeUpdated) state.setSong(state.queue[qIndex]);

      return {
        currentPlayingIndex:
          qIndex >= 0 && qIndex < state.queue.length
            ? qIndex
            : state.currentPlayingIndex,
      };
    });
  },
  getPrevFromQueue: () => {
    set((state) => {
      let qIndex = 0;
      qIndex =
        state.currentPlayingIndex === null ? 0 : state.currentPlayingIndex - 1;

      let songToBeUpdated = null;
      if (state.playoption === "playlistonce") {
        if (qIndex >= 0 && qIndex < state.queue.length)
          songToBeUpdated = state.queue[qIndex];
      } else if (
        state.playoption === "repeat" ||
        state.playoption === "random"
      ) {
        qIndex = qIndex < 0 ? state.queue.length - 1 : qIndex;
        songToBeUpdated = state.queue[qIndex];
      }
      if (songToBeUpdated) state.setSong(state.queue[qIndex]);

      return {
        currentPlayingIndex:
          qIndex >= 0 && qIndex < state.queue.length
            ? qIndex
            : state.currentPlayingIndex,
      };
    });
  },
}));

export default playerStore;
