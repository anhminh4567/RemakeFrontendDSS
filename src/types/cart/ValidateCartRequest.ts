import { AddressRequest } from "../HttpRequests/AddressRequest";
import { PaymentType } from "../shared/PaymentType";
import { CartItem } from "./CartItem";

export interface ValidateCartRequest {
  PromotionId?: string;
  Items: CartItem[];
  UserAddress?: AddressRequest | null;
  AccountId?: string | null;
  IsAtShopOrder: boolean;
  IsCustomOrder: boolean;
  // PaymentMethodId?: string | null;
  PaymentType?: PaymentType | null; // Assuming PaymentType is an enum or type
}
