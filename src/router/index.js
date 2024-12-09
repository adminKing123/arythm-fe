import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Register from "../pages/register/register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
