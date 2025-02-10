import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Account, AuthContextType } from "../types/Account";
import { useCookies } from "react-cookie";
import { accessTokenKVP, refreshTokenKVP } from "@/constants/storageKey";
import { AccountService } from "@/services/accounts";
const AuthContext = createContext<AuthContextType | null>(null);
const ACCOUNT_SESSION_KEY = "ACCOUNT_INFORMATION";
const LS_ACCESS_TOKEN = accessTokenKVP;
const LS_REFRESH_TOKEN = refreshTokenKVP;
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [accountCookie, setAccountCookie, removeAccountCookie] = useCookies(
    [ACCOUNT_SESSION_KEY],
    {}
  );
  const login = (accessToken: string, refreshToken: string) => {
    //setAccountCookie(ACCOUNT_SESSION_KEY, JSON.stringify(account));
    localStorage.setItem(LS_ACCESS_TOKEN, accessToken);
    localStorage.setItem(LS_REFRESH_TOKEN, refreshToken);

    //    setAccount(account);
  };
  const logout = () => {
    //removeAccountCookie(ACCOUNT_SESSION_KEY, {});
    localStorage.removeItem(LS_ACCESS_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
    setAccount(null);
  };
  const getAccountInfo = async (): Promise<Account | null> => {
    const response = await AccountService.GetDetail();
    if (!response.isSuccess) return null;
    else {
      return response.data;
    }
  };
  // const refreshingToken = async (): Promise<
  //   ApiResponse<AuthenticationResponse>
  // > => {
  //   const refreshToken = localStorage.getItem(refreshTokenKVP);
  //   if (!refreshToken)
  //     return {
  //       isSuccess: false,
  //     };
  //   try {
  //     var refreshTokenResponse = await SimpleClient.put<AuthenticationResponse>(
  //       `/Account/RefreshToken?refreshToken=${refreshToken}`,
  //       null,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     return Promise.resolve(
  //       ApiResponse.CreateSuccess(refreshTokenResponse.data)
  //     );
  //   } catch (error) {
  //     const errorResult = ApiResponse.CreateError<any>(
  //       401,
  //       "fail to re-authenticate"
  //     );
  //     localStorage.removeItem(refreshTokenKVP);
  //     localStorage.removeItem(accessTokenKVP);
  //     return Promise.reject(errorResult);
  //   }
  // };
  useEffect(() => {
    // const checkAndFetchAccount = async () => {
    //   let acc = await getAccountInfo();
    //   if (!acc) {
    //     let refreshResponse = await refreshingToken();
    //     if (refreshResponse.isSuccess) {
    //       acc = await getAccountInfo();
    //     }
    //   }
    // };
    // checkAndFetchAccount();
    const tryGetUserInfo = async () => {
      const acc = await getAccountInfo();
      if (!acc) {
        setAccount(null);
      } else {
        setAccount(acc);
        setAccountCookie(ACCOUNT_SESSION_KEY, JSON.stringify(acc));
      }
    };
    tryGetUserInfo();
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          user: account,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
