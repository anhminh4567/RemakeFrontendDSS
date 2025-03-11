import { Promotion } from "./Promotion";

export interface PromoResponse {
  AmountSaved: number;
  PromoId: string;
  PromotionDto: Promotion;
  IsApplicable: boolean;
  ErrorMessage?: string; // Optional property
}

export interface ApplicablePromotion {
  TotalPromotionsCount: number;
  ApplicablePromotionsCount: number;
  Promotions: PromoResponse[];
}
