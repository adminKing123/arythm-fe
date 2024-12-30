import { create } from "zustand";

const pageItemsStore = create((set) => ({
  showGlobalSearch: true,
  setShowGlobalSearch: (value) => {
    set({ showGlobalSearch: value });
  },
}));

export default pageItemsStore;
