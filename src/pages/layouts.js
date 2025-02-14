import { Outlet } from "react-router-dom";
import { useAuthConfigMutation } from "../api/accounts/queryHooks";
import { useEffect, useState } from "react";
import authConfigStore from "../zstore/authConfigStore";
import tokenManager from "../api/utils";
import SideNavbar from "../components/sidenavbar/sidenavbar";
import Header from "../components/header/header";
import ROUTES from "../router/routes";
import ContextMenu from "../components/contextmenu";

export const CheckLogin = () => {
  const setConfig = authConfigStore((state) => state.setConfig);
  const [isLoading, setLoading] = useState(true);
  const { mutate } = useAuthConfigMutation({
    onSuccess: (data) =>
      setConfig(data, () => {
        setLoading(false);
      }),
    onError: () => {
      tokenManager.removeToken();
      window.location = ROUTES.LOGIN;
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading)
    return (
      <div className="w-screen h-screen bg-[#16151A] flex items-center justify-center"></div>
    );

  return <Outlet />;
};

export const Main = () => {
  return (
    <div className="w-screen h-screen bg-[#16151A] flex">
      <SideNavbar />
      <div
        id="main-content"
        className="h-screen flex-grow overflow-y-auto pb-[40px] custom-scroller"
      >
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
      <ContextMenu />
    </div>
  );
};
