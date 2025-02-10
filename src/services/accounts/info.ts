import { Account } from "@/types/Account";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";

export async function GetDetailById(id: string): Promise<ApiResponse<Account>> {
  return ApiClient.get<Account>(`Account/${id}`);
}
export async function GetDetail(): Promise<ApiResponse<Account>> {
  return ApiClient.get<Account>(`Account/null`);
}
