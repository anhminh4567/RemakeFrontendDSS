import { FullName } from "@/types/FullName";

export type RegisterRequest = {
  Email: string;
  Password: string;
  FullName: FullName;
  IsExternalLogin: boolean;
};
