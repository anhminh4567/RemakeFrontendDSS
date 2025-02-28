import { FullName } from "@/types/accounts/FullName";

export type RegisterRequest = {
  Email: string;
  Password: string;
  FullName: FullName;
  IsExternalLogin: boolean;
};
