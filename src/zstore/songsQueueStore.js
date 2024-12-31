import { create } from "zustand";

const songsQueueStore = create((set) => ({
  queue: [],
  addSong: (song) =>
    set((state) => ({
      queue: state.queue.some((s) => s.id === song.id)
        ? state.queue
        : [...state.queue, song],
    })),
  removeSong: (song) =>
    set((state) => ({
      queue: state.queue.filter((s) => s.id !== song.id),
    })),
  clearQueue: () => set({ queue: [] }),
}));

export default songsQueueStore;
