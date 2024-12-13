import tokenManager from "../../api/utils";
import { MenuSvg, SearchSvg, SignSvg } from "../../assets/svg";
import ROUTES from "../../router/routes";
import authConfigStore from "../../zstore/authConfigStore";
import A from "../links/links";

const Tab = ({ children }) => {
  return (
    <A className="text-[#c0c0c0] hover:no-underline hidden md:inline-block">
      {children}
    </A>
  );
};

const OptionSignLogout = ({ user }) => {
  const handleLogout = () => {
    tokenManager.removeToken();
    window.location = ROUTES.LOGIN;
  };

  return user ? (
    <A
      onClick={handleLogout}
      className="h-fit flex items-center gap-3 border-l pl-3 border-[#222227] cursor-pointer hover:no-underline"
    >
      <span className="text-nowrap text-[#c0c0c0]">Logout</span>
      <SignSvg className="fill-[#c0c0c0] w-6 h-6" />
    </A>
  ) : (
    <A
      href={ROUTES.LOGIN}
      className="h-fit flex items-center gap-3 border-l pl-3 border-[#222227] cursor-pointer hover:no-underline"
    >
      <span className="text-nowrap text-[#c0c0c0]">Sign In</span>
      <SignSvg className="fill-[#c0c0c0] w-6 h-6" />
    </A>
  );
};

const SearchInput = () => {
  return (
    <div className="relative">
      <input
        className="h-10 md:w-[320px] w-full bg-[#222227] rounded-xl pl-5 pr-11 focus:outline-none text-white placeholder:text-[#c0c0c0]"
        placeholder="Artist, track or podcast"
      ></input>
      <div className="absolute top-0 right-0 h-full flex items-center mr-5">
        <SearchSvg className="fill-white w-5 h-5" />
      </div>
    </div>
  );
};

const Header = () => {
  const user = authConfigStore((state) => state.user);

  return (
    <div className="z-10 h-[70px] border-[#222227] border-b px-[30px] bg-[#16151A] flex m2lg:sticky m2lg:top-0">
      <div className="flex h-full items-center gap-[30px] flex-grow">
        {user && <Tab>Profile</Tab>}
        <Tab>About</Tab>
        <Tab>Contacts</Tab>
        <div className="lg:ml-[30px] md:w-fit w-full">
          <SearchInput />
        </div>
      </div>
      <div className="hidden items-center sm:flex md:ml-0 ml-8">
        <OptionSignLogout user={user} />
      </div>
      <div className="items-center ml-4 m2lg:flex hidden">
        <MenuSvg className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Header;
