import { Outlet } from "react-router-dom";
import { useAuthConfigMutation } from "../api/accounts/queryHooks";
import { useEffect } from "react";
import authConfigStore from "../zstore/authConfigStore";
import tokenManager from "../api/utils";

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
  return <div className="w-screen h-screen bg-[#16151A]">{children}</div>;
};
