import { PaymentType } from "@/types/PaymentType";
import { AddressRequest } from "../AddressRequest";
import { CartItemRequest } from "./CartItemRequest";

export type CartRequestDto = {
  promotionId?: string | null;
  items: CartItemRequest[];
  userAddress?: AddressRequest | null;
  accountId?: string | null;
  isCustomOrder: boolean;
  paymentType: PaymentType;
};
