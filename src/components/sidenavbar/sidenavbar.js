import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import {
  AddToQueueSvg,
  ArtistsSvg,
  HomeSvg,
  PlaylistsSvg,
  ReleasesSvg,
  SearchSvg,
} from "../../assets/svg";
import ROUTES from "../../router/routes";
import styles from "./sidenavbar.module.css";
import authConfigStore from "../../zstore/authConfigStore";
import MusicPlayer from "../musicplayer/musicplayer";
import playerStore from "../../zstore/playerStore";

const QueueNavbarTab = () => {
  const queue = playerStore((state) => state.queue);

  if (queue.length)
    return (
      <NavLink className={styles.NavbarTab} to="/queue">
        <AddToQueueSvg className="w-[22px] h-[22px]" />
        <span>
          Manage Queue <span className="text-green-500">•</span>
        </span>
      </NavLink>
    );
  return null;
};

const NavbarTab = ({ to, Icon, children }) => {
  return (
    <NavLink className={styles.NavbarTab} to={to}>
      <Icon className="w-[22px] h-[22px]" />
      <span>{children}</span>
    </NavLink>
  );
};

const SideNavbar = () => {
  const user = authConfigStore((state) => state.user);

  return (
    <div
      id="sidebar"
      className="h-screen w-[200px] xxs:w-[280px] border-[#222227] border-r flex flex-col shrink-0 bg-[#16151A] m2lg:absolute m2lg:left-[-280px] m2lg:z-20"
    >
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
        <NavbarTab to={"artists"} Icon={ArtistsSvg}>
          Artists
        </NavbarTab>
        <NavbarTab to={"albums"} Icon={ReleasesSvg}>
          Albums
        </NavbarTab>
        <QueueNavbarTab />
        {user && (
          <NavbarTab to={ROUTES.YOURLIBRARY} Icon={PlaylistsSvg}>
            Your Library
          </NavbarTab>
        )}
      </div>
      <MusicPlayer />
    </div>
  );
};

export default SideNavbar;
