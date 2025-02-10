//import { useAuthContext } from "@/context/useAuthContext";
import PageContainer from "@/layouts/PageContainer";
import Login from "@/pages/authentication/Login";
import Home from "@/pages/home";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  //const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<PageContainer children={<Home />} />}></Route>
          <Route
            path="login"
            element={<PageContainer children={<Login />} />}
          ></Route>
        </Route>
        <Route path="error">
          <Route path="404" element={<div>404</div>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
