import { useAuthConfig } from "../api/accounts/queryHooks";

export const CheckLogin = ({ children }) => {
  const isLoading = useAuthConfig().isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
