import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { PagingResponse } from "@/types/HttpResponses/PagingResponse";
import { Warranty } from "@/types/warranty/Warranty";
import { WarrantyType } from "@/types/warranty/WarrantyType";
import { ApiClient } from "@/utils/ApiClient";

type GetAllWarrantyRequest = {
  CurrentPage: number;
  PageSize: number;
  Name?: string;
  Code?: string;
  MinPrice?: number;
  MaxPrice?: number;
  WarrantyType?: WarrantyType; // Assuming WarrantyType is an enum or type
};
const defaultGetAllWarrantyRequest: GetAllWarrantyRequest = {
  CurrentPage: 0,
  PageSize: 100,
};

async function getAll(): Promise<ApiResponse<PagingResponse<Warranty>>> {
  let request = defaultGetAllWarrantyRequest;
  let result = await ApiClient.get<PagingResponse<Warranty>>(
    "Warranty/All",
    request
  );
  return result;
}
async function get(WarrantyId: string): Promise<ApiResponse<Warranty>> {
  let result = await ApiClient.get<Warranty>("Warranty/" + WarrantyId);
  return result;
}
export const warrantyService = {
  getAll,
  get,
};
