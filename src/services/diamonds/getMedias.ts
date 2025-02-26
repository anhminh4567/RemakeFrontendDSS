import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApiClient } from "@/utils/ApiClient";
import { Gallery } from "@/types/Gallery";

export async function GetDiamondMedia(
  id: string
): Promise<ApiResponse<Gallery>> {
  return ApiClient.get<Gallery>(`Diamond/${id}/Files`);
}
