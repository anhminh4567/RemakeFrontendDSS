import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";
import { Diamond } from "@/types/diamonds/Diamond";

export function GetDiamond(id: string): Promise<ApiResponse<Diamond>> {
  return ApiClient.get<Diamond>(`Diamond/${id}`);
}
