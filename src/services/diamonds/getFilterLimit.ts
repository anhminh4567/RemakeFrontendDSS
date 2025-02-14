import { DiamondFilterLimit } from "@/types/HttpResponses/DiamondFilterLimitResponse";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";

export function GetDiamondFilterLimit(): Promise<
  ApiResponse<DiamondFilterLimit>
> {
  return ApiClient.get<DiamondFilterLimit>("Diamond/FilterLimit");
}
