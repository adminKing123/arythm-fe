const API_ENDPOINTS = {
  register: "/auth/register",
  RESEND_EMAIL_OTP: "/auth/resend-email-otp",
  VERIFY_EMAIL: "/auth/verify-email-and-activate-account",
  LOGIN: "/auth/username/login",
  REQUEST_PASSWORD_CHANGE_EMAIL_OTP: "/auth/request-password-change-email-otp",
  RESET_PASSWORD_WITH_EMAIL: "/auth/reset-password-with-email",
  AUTH_CONFIG: "/auth/config",
  GET_SLIDES: "/content/get-slides",
  GET_SONGS: "/content/songs",
  GET_SONG: (id) => `/content/songs/${id}`,
  GET_ARTISTS: "/content/artists",
  GET_ALBUMS: "/content/albums",
  GET_SONGS_HISTORY: "/content/songs-history",
  LIKED_SONG: "/content/liked-songs",
  LATEST_PLAYLISTS: "/content/latest-playlists",
  GLOBAL_SEARCH: "/content/global-search",
  FILTER: "/content/filter",
  GET_RANDOM_SONG: "/content/songs/random/",
};

export default API_ENDPOINTS;
