//import { useAuthContext } from "@/context/useAuthContext";
import PageContainer from "@/layouts/PageContainer";
import Login from "@/pages/authentication/Login";
import DiamondDetail from "@/pages/diamonds/detail";
import DiamondList from "@/pages/diamonds/list";
import Home from "@/pages/home";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  //const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<PageContainer children={<Home />} />} />
          <Route
            path="login"
            element={<PageContainer children={<Login />} />}
          ></Route>
          <Route path="diamond">
            <Route
              index
              element={<PageContainer children={<DiamondList />} />}
            />
            <Route
              path=":diamondId"
              element={<PageContainer children={<DiamondDetail />} />}
            />
          </Route>
        </Route>
        <Route path="error">
          <Route path="404" element={<div>404</div>}></Route>
        </Route>
        <Route path="*" element={<div>not found 404</div>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
