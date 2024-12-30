import { useEffect, useRef, useState } from "react";
import tokenManager from "../../api/utils";
import { MenuSvg, SearchSvg, SignSvg } from "../../assets/svg";
import ROUTES from "../../router/routes";
import authConfigStore from "../../zstore/authConfigStore";
import A from "../links/links";
import { useDebounce } from "use-debounce";
import { GlobalSearchContainer } from "../songcards/containers";
import pageItemsStore from "../../zstore/pageItemsStore";

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
  const [isSearching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const [debouncedQ] = useDebounce(q, 300);
  const user = authConfigStore((state) => state.user);
  const inputRef = useRef(null);

  const handleClose = (q = true) => {
    setSearching(false);
    if (q) setQ("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isSearching) {
        inputRef.current?.blur();
        handleClose();
      }

      if (event.ctrlKey && event.key === " ") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearching]);

  return (
    <div
      className={`
      ${
        isSearching
          ? "absolute top-0 left-0 z-20 w-screen flex justify-center bg-[#00000030] h-screen"
          : ""
      }`}
      onClick={() => {
        handleClose();
      }}
    >
      <div
        className={`${
          isSearching ? "min-w-[280px] w-full max-w-[740px] h-fit" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {isSearching ? (
          debouncedQ ? (
            user ? (
              <GlobalSearchContainer q={debouncedQ} handleClose={handleClose} />
            ) : (
              <div className="bg-[#16151A] border border-[#222227] rounded-xl top-2 absolute min-w-[280px] w-full max-w-[740px] pt-[70px] px-6 pb-6">
                <p className="text-center">Login Required!</p>
              </div>
            )
          ) : (
            <div className="bg-[#16151A] border border-[#222227] rounded-xl top-2 absolute min-w-[280px] w-full max-w-[740px] pt-[70px] px-6 pb-6">
              <p className="text-center">Please enter your search query!</p>
            </div>
          )
        ) : null}
        <div className="flex justify-center items-center h-[70px] mx-2">
          <div className="relative w-full">
            <input
              ref={inputRef}
              className="h-10 w-full bg-[#222227] rounded-xl pl-5 pr-20 focus:outline-none text-white placeholder:text-[#c0c0c0]"
              placeholder="Artist, track or podcast"
              onFocus={() => setSearching(true)}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            ></input>
            <div className="absolute top-0 right-0 h-full flex items-center mr-5">
              {isSearching ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setSearching(false);
                    setQ("");
                  }}
                >
                  close
                </span>
              ) : (
                <SearchSvg className="fill-white w-5 h-5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideBarToggler = () => {
  const [isOpen, setOpen] = useState(false);

  const handleMenuClick = () => {
    const sidebar = document.getElementById("sidebar");
    const left = isOpen ? "-280px" : "0px";
    sidebar.style.left = left;
    setOpen(!isOpen);
  };

  return (
    <div
      className="items-center ml-4 m2lg:flex hidden"
      onClick={handleMenuClick}
    >
      <MenuSvg
        className={`w-6 h-6 ${isOpen ? "stroke-[#25a56a]" : "stroke-white"}`}
      />
    </div>
  );
};

const Header = () => {
  const user = authConfigStore((state) => state.user);
  const showGlobalSearch = pageItemsStore((state) => state.showGlobalSearch);

  return (
    <div className="z-10 h-[70px] border-[#222227] border-b px-[30px] bg-[#16151A] flex m2lg:sticky m2lg:top-0">
      <div className="flex h-full items-center gap-[30px] flex-grow">
        {user && <Tab>Profile</Tab>}
        <Tab>About</Tab>
        <Tab>Contacts</Tab>
        {showGlobalSearch ? (
          <div className="lg:ml-[30px] md:w-fit w-full">
            <SearchInput />
          </div>
        ) : null}
      </div>
      <div className="hidden items-center sm:flex md:ml-0 ml-8">
        <OptionSignLogout user={user} />
      </div>
      <SideBarToggler />
    </div>
  );
};

export default Header;
