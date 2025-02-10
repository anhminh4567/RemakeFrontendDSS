export type LoginRequest = {
  Email: string;
  Password: string;
  IsExternalRegister: boolean;
  IsStaffLogin: boolean;
  ExternalProviderName?: string;
};
