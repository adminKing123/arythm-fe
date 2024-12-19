import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Register from "../pages/register/register";
import VerifyEmail from "../pages/verifyemail/verifyemail";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import ForgotPassword from "../pages/forgotpassword/forgotpassword";
import Resetpassword from "../pages/forgotpassword/resetpassword";
import { CheckLogin, Main } from "../pages/layouts";
import YourLibrary from "../pages/yourlibrary/yourlibrary";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route path={ROUTES.VERIFYEMAIL} element={<VerifyEmail />}></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route
          path={ROUTES.FORGOTPASSWORD}
          element={<ForgotPassword />}
        ></Route>
        <Route path={ROUTES.RESETPASSWORD} element={<Resetpassword />}></Route>

        <Route element={<CheckLogin />}>
          <Route element={<Main />}>
            <Route index element={<Navigate to={ROUTES.HOME} replace />} />
            <Route path={ROUTES.HOME} element={<Home />}></Route>
            <Route path={ROUTES.YOURLIBRARY} element={<YourLibrary />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
