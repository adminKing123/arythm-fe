import authConfigStore from "../zstore/authConfigStore";

const tokenManager = {
  getToken: () =>
    localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  setToken: (token, rememberMe) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    if (rememberMe) localStorage.setItem("token", token);
    else sessionStorage.setItem("token", token);
  },
  removeToken: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },
};

export const get_src_uri = (path) => {
  return `${authConfigStore.getState().SRC_URI}${path}`;
};

export const numeral = (num) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(num);
};

export default tokenManager;
