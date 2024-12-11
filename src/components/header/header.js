import tokenManager from "../../api/utils";
import { SearchSvg, SignSvg } from "../../assets/svg";
import ROUTES from "../../router/routes";
import authConfigStore from "../../zstore/authConfigStore";
import A from "../links/links";

const Tab = ({ children }) => {
  return <A className="text-[#c0c0c0] hover:no-underline">{children}</A>;
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
        className="h-10 w-[320px] bg-[#222227] rounded-xl pl-5 pr-11 focus:outline-none text-white placeholder:text-[#c0c0c0]"
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
    <div className="h-[70px] border-[#222227] border-b px-[30px]">
      <div className="flex h-full">
        <div className="flex items-center gap-[30px] flex-grow">
          {user && <Tab>Profile</Tab>}
          <Tab>About</Tab>
          <Tab>Contacts</Tab>
          <div className="ml-[30px]">
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center">
          <OptionSignLogout user={user} />
        </div>
      </div>
    </div>
  );
};

export default Header;
