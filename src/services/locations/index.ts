import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { Province } from "@/types/location/Province";
import { ApiClient } from "@/utils/ApiClient";

async function getProvince(): Promise<ApiResponse<Province[]>> {
  let result = ApiClient.get<Province[]>(`Location/Province`);
  return result;
}
export const LocationService = {
  getProvince,
};
