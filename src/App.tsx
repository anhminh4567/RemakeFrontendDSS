import { CookiesProvider } from "react-cookie";
import "./App.css";
import { AuthProvider } from "./context/useAuthContext";
import AllRoutes from "./routes";
import { UserProvider } from "./context/useUserContext";

function App() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <UserProvider>
            <AllRoutes />
          </UserProvider>
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
