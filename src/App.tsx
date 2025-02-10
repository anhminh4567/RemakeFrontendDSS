import { CookiesProvider } from "react-cookie";
import "./App.css";
import { AuthProvider } from "./context/useAuthContext";
import AllRoutes from "./routes";

function App() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <AllRoutes />
          {/* <PageContainer children={<Home />} />
           */}
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
