import authConfigStore from "../../zstore/authConfigStore";
import { Main } from "../layouts";

const Home = () => {
  const user = authConfigStore((state) => state.user);
  return <Main>{user ? user.email : ""}</Main>;
};

export default Home;
