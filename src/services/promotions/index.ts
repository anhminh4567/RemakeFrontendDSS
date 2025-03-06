import { ValidateCartRequest } from "@/types/cart/ValidateCartRequest";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { ApplicablePromotion } from "@/types/promotion/ApplicablePromotion";
import { Promotion } from "@/types/promotion/Promotion";
import { ApiClient } from "@/utils/ApiClient";

function getApplicable(
  cartRequest: ValidateCartRequest
): Promise<ApiResponse<ApplicablePromotion>> {
  let result = ApiClient.get<ApplicablePromotion>(
    "Promotion/GetApplicable",
    cartRequest
  );
  return result;
}
function getAll(): Promise<ApiResponse<Promotion[]>> {
  let result = ApiClient.get<Promotion[]>("Promotion");
  return result;
}
function getDetail(id: string): Promise<ApiResponse<Promotion>> {
  let result = ApiClient.get<Promotion>(`Promotion?promotionId=${id}`);
  return result;
}
export const PromotionService = {
  getAll,
  getDetail,
  getApplicable,
};
