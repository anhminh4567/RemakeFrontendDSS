import { Diamond } from "@/types/diamonds/Diamond";
import {
  Clarity,
  Color,
  Culet,
  Cut,
  Fluorescence,
  Girdle,
  Polish,
  Symmetry,
} from "@/types/diamonds/Enums";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { PagingResponse } from "@/types/HttpResponses/PagingResponse";
import { ProductStatus } from "@/types/ProductStatus";
import { ApiClient } from "@/utils/ApiClient";

export type GetDiamondPagingRequest = {
  isLab?: boolean;
  shapeId?: string;
  includeJewelryDiamond?: boolean;
  pageSize?: number;
  start?: number;
  priceStart?: number;
  priceEnd?: number;
  "diamond_4C.cutFrom"?: Cut;
  "diamond_4C.cutTo"?: Cut;
  "diamond_4C.colorFrom"?: Color;
  "diamond_4C.colorTo"?: Color;
  "diamond_4C.clarityFrom"?: Clarity;
  "diamond_4C.clarityTo"?: Clarity;
  "diamond_4C.caratFrom"?: number;
  "diamond_4C.caratTo"?: number;
  "diamond_Details.Polish"?: Polish;
  "diamond_Details.Symmetry"?: Symmetry;
  "diamond_Details.Girdle"?: Girdle;
  "diamond_Details.Fluorescence"?: Fluorescence;
  "diamond_Details.Culet"?: Culet;
  "GetDiamond_ManagerQuery.diamondStatuses"?: ProductStatus[];
  "GetDiamond_ManagerQuery.sku"?: string;
};
const defaultCustomerValue: GetDiamondPagingRequest = {
  isLab: false,
  shapeId: "1",
  pageSize: 10,
  start: 0,
};
const defaultManagerValue: GetDiamondPagingRequest = {
  pageSize: 10,
  start: 0,
};

export function GetDiamondPaging(
  isManagerQuery: boolean = false,
  requestQuery: GetDiamondPagingRequest
): Promise<ApiResponse<PagingResponse<Diamond>>> {
  if (!isManagerQuery) {
    requestQuery = {
      ...defaultCustomerValue,
      ...requestQuery,
    };
  } else {
    requestQuery = {
      ...defaultManagerValue,
      ...requestQuery,
    };
  }

  return ApiClient.get<PagingResponse<Diamond>>("Diamond/Page", requestQuery);
}
