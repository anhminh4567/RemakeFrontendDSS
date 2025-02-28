import { Gift } from "../gifts/Gift";
import { Media } from "../Media";
import { Requirement } from "../requirements/Requirement";
import { DiscountPromotionRedemptionMode } from "../shared/DiscountPromotionRedemptionMode";
import { DiscountPromotionStatus } from "../shared/DiscountPromotionStatus";

export interface Promotion {
  Id: string;
  PromoCode: string;
  Name: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean; // Calculated property, see note below
  Priority: number;
  Status: DiscountPromotionStatus;
  IsExcludeQualifierProduct: boolean;
  RedemptionMode: DiscountPromotionRedemptionMode;
  PromoReqs: Requirement;
  Gifts: Gift;
  Thumbnail?: Media;
  PromotionDescriptionDetail: string; // Calculated property, see note below
}
