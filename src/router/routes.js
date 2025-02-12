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
  ALBUMS: "/albums",
  PLAYLIST: "/playlist/:id",
  GET_PLAYLIST_URI: (id) => `/playlist/${id}`,
  SONG: "/song/:id",
  GET_SONG_URI: (id) => `/song/${id}`,
  ARTIST: "/artist/:id",
  GET_ARTIST_URI: (id) => `/artist/${id}`,
  ALBUM: "/album/:id",
  GET_ALBUM_URI: (id) => `/album/${id}`,
};

export default ROUTES;
