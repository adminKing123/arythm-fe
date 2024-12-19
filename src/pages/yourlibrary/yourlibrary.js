import authConfigStore from "../../zstore/authConfigStore";
import ROUTES from "../../router/routes";

const YourLibrary = () => {
  const user = authConfigStore((state) => state.user);

  console.log(user);

  if (!user) {
    alert("Please Login To Access This Page!");
    window.location = ROUTES.LOGIN;
    return;
  }

  return <></>;
};

export default YourLibrary;
