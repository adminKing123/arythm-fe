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
    localStorage.removeItem("last_song");
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

export const formatPlayerTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `-${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const setSongMetaData = async (song) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.original_name,
      artist: song.artists.map((artist) => artist.name).join(", "),
      album: song.album.title,
      artwork: [
        {
          src: get_src_uri(song.album.thumbnail300x300),
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: get_src_uri(song.album.thumbnail300x300),
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: get_src_uri(song.album.thumbnail1200x1200),
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: get_src_uri(song.album.thumbnail1200x1200),
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: get_src_uri(song.album.thumbnail1200x1200),
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: get_src_uri(song.album.thumbnail1200x1200),
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  }
};

export default tokenManager;
