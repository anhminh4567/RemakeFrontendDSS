import { LoginRequest } from "../../types/HttpRequests/LoginRequest";
import { AuthenticationResponse } from "@/types/HttpResponses/AuthenticationResponse";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";

export async function LoginCustomer(
  request: LoginRequest
): Promise<ApiResponse<AuthenticationResponse>> {
  const body = {
    Email: request.Email,
    Password: request.Password,
    IsExternalLogin: false,
    IsStaffLogin: false,
  };
  if (request.IsExternalRegister)
    if (!request.ExternalProviderName)
      throw new Error("login exteernal but no providder is given");

  return ApiClient.post<AuthenticationResponse>("Account/Login", body);
}
