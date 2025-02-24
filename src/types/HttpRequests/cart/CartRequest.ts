import { PaymentType } from "@/types/PaymentType";
import { AddressRequest } from "../AddressRequest";
import { CartItem } from "./CartItemRequest";

export type CartRequestDto = {
  promotionId?: string | null;
  items: CartItem[];
  userAddress?: AddressRequest | null;
  accountId?: string | null;
  isCustomOrder: boolean;
  paymentType: PaymentType;
};
