import { Outlet } from "react-router-dom";
import { useAuthConfigMutation } from "../api/accounts/queryHooks";
import { useEffect } from "react";
import authConfigStore from "../zstore/authConfigStore";
import tokenManager from "../api/utils";
import SideNavbar from "../components/sidenavbar/sidenavbar";
import Header from "../components/header/header";

export const CheckLogin = () => {
  const setConfig = authConfigStore((state) => state.setConfig);
  const { mutate } = useAuthConfigMutation({
    onSuccess: setConfig,
    onError: () => tokenManager.removeToken(),
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return <Outlet />;
};

export const Main = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-[#16151A] flex">
      <SideNavbar />
      <div className="h-screen flex-grow overflow-y-auto">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};
