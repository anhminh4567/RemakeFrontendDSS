import { Promotion } from "./Promotion";

export interface PromoResponse {
  amountSaved: number;
  promoId: string;
  promotionDto: Promotion;
  isApplicable: boolean;
  errorMessage?: string; // Optional property
}

export interface ApplicablePromotion {
  totalPromotionsCount: number;
  applicablePromotionsCount: number;
  promotions: PromoResponse;
}
