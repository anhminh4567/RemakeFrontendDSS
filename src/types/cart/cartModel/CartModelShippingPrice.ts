import { Address } from "@/types/accounts/Account";
import { DeliveryFee } from "@/types/deliveryFee/DeliveryFee";

export interface CartModelShippingPrice {
  DefaultPrice: number; // decimal becomes number
  PromotionPrice: number;
  UserRankReducedPrice: number;
  FinalPrice: number;
  To?: Address;
  From?: Address;
  DeliveryFeeFounded?: DeliveryFee;
  IsValid: boolean;
  IsSameCityDelivery: boolean; // Calculated property, see note
  IsLocationActive: boolean;
}
