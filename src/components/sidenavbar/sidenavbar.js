import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import {
  ArtistsSvg,
  HomeSvg,
  PlayerNextSvg,
  PlayerPrevSvg,
  PlaylistsSvg,
  PlaySvg,
  ReleasesSvg,
  SearchSvg,
} from "../../assets/svg";
import ROUTES from "../../router/routes";
import styles from "./sidenavbar.module.css";
import authConfigStore from "../../zstore/authConfigStore";
import { get_src_uri } from "../../api/utils";
import { useRef } from "react";

const NavbarTab = ({ to, Icon, children }) => {
  return (
    <NavLink className={styles.NavbarTab} to={to}>
      <Icon className="w-[22px] h-[22px]" />
      <span>{children}</span>
    </NavLink>
  );
};

const MusicPlayer = () => {
  const song = {
    id: 1111,
    title: "PFLMDA80 - Song for Denise.mp3",
    url: "songs-file/PFLMDA80%20-%20Song%20for%20Denise.mp3",
    original_name: "Song for Denise",
    lyrics: "lrc/1111.lrc",
    album: {
      id: 741,
      code: "PFLMDA80",
      title: "Best of Collector: Piano Fantasia (Le meilleur des années 80)",
      year: 2012,
      thumbnail300x300:
        "album-images/300x300/PFLMDA80%20-%20Best%20of%20Collector%3A%20Piano%20Fantasia%20%28Le%20meilleur%20des%20ann%C3%A9es%2080%29%20%282012%29.png",
      thumbnail1200x1200:
        "album-images/1200x1200/PFLMDA80%20-%20Best%20of%20Collector%3A%20Piano%20Fantasia%20%28Le%20meilleur%20des%20ann%C3%A9es%2080%29%20%282012%29.png",
    },
    count: 0,
    tags: [
      {
        id: 3,
        name: "BGM",
      },
      {
        id: 11,
        name: "Russian",
      },
    ],
    artists: [
      {
        id: 592,
        name: "Piano Fantasia",
        thumbnail300x300: "artist-images/300x300/Piano%20Fantasia.png",
        thumbnail1200x1200: "artist-images/1200x1200/Piano%20Fantasia.png",
      },
    ],
  };

  const musicPlayerContainerRef = useRef(null);

  const toggle = () => {
    if (musicPlayerContainerRef.current) {
      const bottom = musicPlayerContainerRef.current.style.bottom;
      musicPlayerContainerRef.current.style.bottom =
        bottom === "0px" ? "-260px" : "0px";
    }
  };

  return (
    <div
      ref={musicPlayerContainerRef}
      className="sticky p-5 border border-[#222227] bg-[#16151a] h-[260px] m2lg:w-screen m2lg:z-20 m2lg:absolute m2lg:left-[280px] m2lg:bottom-[-260px]"
    >
      <button
        onClick={toggle}
        className="hidden m2lg:flex absolute -translate-x-1/2 left-1/2 rounded-t-xl bg-[#16151a] h-[40px] w-[90px] -top-10 items-center justify-center text-sm border border-[#222227]"
      >
        <ReleasesSvg className="w-[18px] h-[18px] fill-[#25a56a] mr-2" /> Player
      </button>
      <div className="w-full flex justify-center">
        <img
          className="w-[90px] h-[90px] rounded-xl"
          src={get_src_uri(song.album.thumbnail300x300)}
          alt="thumbnail"
        />
      </div>
      <div className="w-full flex justify-center mt-[10px]">
        <div className="max-w-64 truncate text-center">
          <span className="text-white font-medium">{song.original_name}</span>
          <span> - {song.album.title}</span>
        </div>
      </div>
      <div className="mt-[10px] flex justify-center items-center w-full gap-[10px]">
        <PlayerPrevSvg className="w-6 h-6 fill-white" />
        <PlaySvg className="w-6 h-6 fill-white" />
        <PlayerNextSvg className="w-6 h-6 fill-white" />
      </div>
    </div>
  );
};

const SideNavbar = () => {
  const user = authConfigStore((state) => state.user);

  return (
    <div className="h-screen w-[280px] border-[#222227] border-r flex flex-col shrink-0 bg-[#16151A] m2lg:absolute m2lg:left-[-280px]">
      <div className="flex-shrink-0 border-[#222227] border-b h-[70px] px-[30px] flex items-center">
        <img src={Logo} alt="logo" className="w-12" />
        <span className="ml-2 text-xl mt-1 font-sans">
          <b className="text-green-400 font-sans">AR</b>hythm
        </span>
      </div>
      <div className="flex-grow overflow-y-auto p-[30px] flex flex-col gap-5">
        <NavbarTab to={ROUTES.HOME} Icon={HomeSvg}>
          Home
        </NavbarTab>
        <NavbarTab to={"search"} Icon={SearchSvg}>
          Search
        </NavbarTab>
        <NavbarTab to={"releases"} Icon={ReleasesSvg}>
          Releases
        </NavbarTab>
        <NavbarTab to={"artists"} Icon={ArtistsSvg}>
          Artists
        </NavbarTab>
        {user && (
          <NavbarTab to={"playlists"} Icon={PlaylistsSvg}>
            Playlists
          </NavbarTab>
        )}
      </div>
      <MusicPlayer />
    </div>
  );
};

export default SideNavbar;
