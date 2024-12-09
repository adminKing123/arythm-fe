import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Register from "../pages/register/register";
import VerifyEmail from "../pages/verifyemail/verifyemail";
import Login from "../pages/login/login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route path={ROUTES.VERIFYEMAIL} element={<VerifyEmail />}></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
