import { Media } from "../Media";
import { Requirement } from "../requirements/Requirement";
import { DiscountPromotionStatus } from "../shared/DiscountPromotionStatus";

export interface Discount {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean; // Calculated property, see note below
  Status: DiscountPromotionStatus;
  DiscountCode: string;
  DiscountPercent: number;
  DiscountReq: Requirement;
  Thumbnail?: Media;
}
