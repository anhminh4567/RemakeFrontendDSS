import { CookiesProvider } from "react-cookie";
import "./App.css";
import { AuthProvider } from "./context/useAuthContext";
import AllRoutes from "./routes";
import { UserProvider } from "./context/useUserContext";
import { ConfigProvider, ThemeConfig } from "antd";
import { COLORS } from "@/constants";

const MY_THEME_NORMAL: ThemeConfig = {
  components: {
    Pagination: {
      //itemActiveBg: COLORS.lightGold,
      //colorText:
      itemInputBg: COLORS.lightGold,
      itemActiveBg: COLORS.darkGold,
      colorInfoTextActive: "000000",
      colorText: COLORS.textBlackRGBA,
      colorBgTextActive: COLORS.textWhiteRGBA,
      colorPrimaryBorder: COLORS.mainGold,
      itemActiveColorDisabled: COLORS.textWhiteRGBA,
      itemActiveBgDisabled: COLORS.darkGoldRGBA,
      colorBgContainer: COLORS.mainGold,
      colorLink: "000000",
    },
    Select: {
      activeOutlineColor: COLORS.lightGold,
      colorPrimary: COLORS.mainGold,
    },
    Input: {
      activeBorderColor: COLORS.mainGold,
    },
  },
  token: {
    colorPrimary: COLORS.mainGold,
    colorBgBase: COLORS.mainGold,
    colorTextSecondary: "ffffff",
    colorTextBase: "000000",
    colorErrorText: "red",
    colorBgTextActive: COLORS.darkGoldRGBA,
    colorBgTextHover: COLORS.secondaryGold,
    colorPrimaryBorder: COLORS.lightGold,
    colorBgContainer: "ffffff",
    colorPrimaryHover: COLORS.mainGold,
    colorBorder: COLORS.darkGold,
    colorBorderSecondary: COLORS.mainGray,
    colorInfoBorder: COLORS.mainGold,
    colorInfoBorderHover: COLORS.darkGold,
    colorPrimaryBorderHover: COLORS.darkGold,
  },
};
function App() {
  return (
    <>
      <CookiesProvider>
        <ConfigProvider theme={MY_THEME_NORMAL}>
          <AuthProvider>
            <UserProvider>
              <AllRoutes />
            </UserProvider>
          </AuthProvider>
        </ConfigProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
