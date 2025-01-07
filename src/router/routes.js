const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFYEMAIL: "/verify-email",
  FORGOTPASSWORD: "/forgot-password",
  RESETPASSWORD: "/reset-password",
  HOME: "/home",
  YOURLIBRARY: "/your-library",
  SEARCH: "/search",
  GET_SEARCH_URI: (q, index) => `/search?q=${q}&index=${index}`,
  QUEUE: "/queue",
  ARTISTS: "/artists",
};

export default ROUTES;
