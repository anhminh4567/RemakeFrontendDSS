export interface CartModelPrice {
  UserRankDiscountPercent: number; // decimal becomes number
  UserRankDiscountAmount: number;
  DefaultPrice: number;
  DiscountAmountSaved: number;
  // DiscountPrice: number; // Calculated property, see note
  PromotionAmountSaved: number;
  OrderAmountSaved: number;
  ProductPromotionAmountSaved: number;
  TotalWarrantyPrice: number;
  ShippingPriceSaved: number;
  TotalShippingPrice: number;
  FinalShippingPrice: number;
  FinalPrice: number;
}
