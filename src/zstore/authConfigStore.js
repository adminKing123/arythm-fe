import { create } from "zustand";

const authConfigStore = create((set) => ({
  user: null,
  SRC_URI: "",
  setConfig: (config) => {
    set({ user: config.user, SRC_URI: config.SRC_URI });
  },
}));

export default authConfigStore;
