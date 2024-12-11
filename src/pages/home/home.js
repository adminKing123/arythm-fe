import { useAuthConfig } from "../../api/accounts/queryHooks";
import { CheckLogin } from "../layouts";

const Home = () => {
  const { data } = useAuthConfig();

  return (
    <CheckLogin>
      <div className="w-screen h-screen bg-[#16151A]">
        {data?.user ? data.user.email : "Login Creds Not Found"}
      </div>
    </CheckLogin>
  );
};

export default Home;
