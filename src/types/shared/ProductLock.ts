import { Account } from "../accounts/Account";

export type ProductLock = {
  AccountId?: string;
  LockEndDate?: string;
  Account?: Account;
};
