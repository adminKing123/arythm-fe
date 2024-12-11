import { create } from "zustand";

const authConfigStore = create((set) => ({
  user: null,
  setConfig: (config) => {
    set({ user: config.user });
  },
}));

export default authConfigStore;
