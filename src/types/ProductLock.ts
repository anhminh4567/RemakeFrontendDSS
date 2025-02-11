import { Account } from "./Account";

export type ProductLock = {
  AccountId?: string;
  LockEndDate?: string;
  Account?: Account;
};
