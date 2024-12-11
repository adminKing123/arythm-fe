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

export default tokenManager;
