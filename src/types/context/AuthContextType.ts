import { Account } from "../Account";

export type AuthContextType = {
  user?: Account;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};
