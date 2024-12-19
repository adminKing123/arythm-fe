import { create } from "zustand";

const authConfigStore = create((set) => ({
  user: null,
  SRC_URI: "",
  setConfig: (config, callback) => {
    set({ user: config.user, SRC_URI: config.SRC_URI });
    callback();
  },
}));

export default authConfigStore;
