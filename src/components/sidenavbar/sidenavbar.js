import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import {
  ArtistsSvg,
  HomeSvg,
  PlaylistsSvg,
  ReleasesSvg,
  SearchSvg,
} from "../../assets/svg";
import ROUTES from "../../router/routes";
import styles from "./sidenavbar.module.css";
import authConfigStore from "../../zstore/authConfigStore";

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
    <div className="h-screen w-[280px] border-[#222227] border-r flex flex-col shrink-0">
      <div className="flex-shrink-0 border-[#222227] border-b h-[70px] px-[30px] flex items-center">
        <img src={Logo} alt="logo" className="w-12" />
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
      <div className="border border-[#222227] h-[260px] flex-shrink-0"></div>
    </div>
  );
};

export default SideNavbar;
