import { DiamondFilterLimit } from "@/types/HttpResponses/DiamondFilterLimitResponse";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";

// this will be replaces soon, ApiClient now return a result objeect named ApiResponse
// it does not return a resolve reject, in future, if needed, check result,
// if result.isSuccess, put it in a Promise.Resolve(), and else Promise.Reject()
export async function GetDiamondFilterLimit(): Promise<
  ApiResponse<DiamondFilterLimit>
> {
  let result = await ApiClient.get<DiamondFilterLimit>("Diamond/FilterLimit");
  if (result.isSuccess) return result;
  else return result;
}
