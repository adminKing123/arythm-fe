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

  CREATE_PLAYLIST: "/content/playlists/",
  GET_PLAYLISTS: "/content/playlists/",
  ADD_SONGS_IN_PLAYLIST: (id) => `/content/playlists/${id}/add_songs/`,
  GET_PLAYLIST_SONGS: (id) => `/content/playlistseeker/${id}/songs`,
  GET_RANDOM_PLAYLIST_SONG: (id) => `/content/playlistseeker/${id}/random`,
  GET_RANDOM_PLAYLIST_SONG_SEEK: (id) => `/content/playlistseeker/${id}/seek`,

  ADD_REQUEST_TO_ADD_SONG: `/song-requests/handle/`,
  GET_MORE_RELATED_SONGS: (id) => `/content/songs/${id}/related_songs/`,
};

export default API_ENDPOINTS;
