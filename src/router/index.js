import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Register from "../pages/register/register";
import VerifyEmail from "../pages/verifyemail/verifyemail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route path={ROUTES.VERIFYEMAIL} element={<VerifyEmail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
