import { create } from "zustand";

const contextMenuStore = create((set) => ({
  data: null,
  setData: (value) => {
    set({ data: value });
  },
}));

export default contextMenuStore;
