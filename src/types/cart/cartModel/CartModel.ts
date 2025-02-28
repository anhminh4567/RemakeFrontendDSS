import { Discount } from "@/types/discounts/Discount";
import { CartModelPromotion } from "./CartModelPromotion";
import { CartModelPrice } from "./CartModelPrice";
import { CartModelShippingPrice } from "./CartModelShippingPrice";
import { CartModelCounter } from "./CartModelCounter";
import { CartModelValidation } from "./CartModelValidation";
import { CartProduct } from "./CartProduct";

export interface CartModel {
  Promotion: CartModelPromotion;
  DiscountsApplied: Discount[];
  OrderPrices: CartModelPrice;
  ShippingPrice: CartModelShippingPrice;
  OrderCounter: CartModelCounter;
  OrderValidation: CartModelValidation;
  Products: CartProduct[];
  PayAmount?: number; // decimal? becomes number | null
  DepositAmount?: number; // decimal? becomes number | null
}
