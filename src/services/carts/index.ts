import { userCartKVP } from "@/constants/storageKey";
import { Account } from "@/types/accounts/Account";
import { CartItem } from "@/types/cart/CartItem";
import { CartModel } from "@/types/cart/cartModel/CartModel";
import { ValidateCartRequest } from "@/types/cart/ValidateCartRequest";
import { AddressRequest } from "@/types/HttpRequests/AddressRequest";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import { Promotion } from "@/types/promotion/Promotion";
import { PaymentType } from "@/types/shared/PaymentType";
import { ApiClient } from "@/utils/ApiClient";
function add(item: CartItem): void {
  if (!item) return;
  let currentItems = getFromStorage();
  currentItems.push(item);
  localStorage.setItem(userCartKVP, JSON.stringify(currentItems));
}
function remove(itemId: string) {
  if (!itemId) return;
  let currentItems = getFromStorage();
  let indexItem = currentItems.findIndex((item) => item.Id == itemId);
  if (indexItem < 0) return;
  currentItems.splice(indexItem, 1);
  localStorage.setItem(userCartKVP, JSON.stringify(currentItems));
}
function get(
  delegate: (item: CartItem, index: number) => boolean
): CartItem | null {
  if (!delegate) return null;
  let currentItems = getFromStorage();
  const result = currentItems.find(delegate);
  return result;
}
function getAll(): CartItem[] {
  let currentItems = getFromStorage();
  return currentItems;
}
function clear() {
  localStorage.removeItem(userCartKVP);
}

function getFromStorage(): CartItem[] {
  let stringCart = localStorage.getItem(userCartKVP);
  if (!stringCart) {
    let newCartStr = JSON.stringify([]);
    localStorage.setItem(userCartKVP, newCartStr);
    stringCart = newCartStr;
  }
  return JSON.parse(stringCart) as CartItem[];
}

// async function validate(cartObj: ValidateCartRequest) : Promise<ApiResponse< {
//   let result = ApiClient.post("/Cart/Validate", cartObj)
// }
async function validate(
  cartItems: CartItem[],
  paymentType?: PaymentType,
  promotion?: Promotion,
  user?: Account,
  address?: AddressRequest
): Promise<ApiResponse<CartModel>> {
  if (!cartItems)
    throw new Error("cart item is null, nearly impossiblee state");
  let validateRequest: ValidateCartRequest = {
    IsAtShopOrder: false,
    IsCustomOrder: false,
    Items: cartItems,
    AccountId: user?.Id,
    PaymentType: paymentType,
    PromotionId: promotion?.Id,
    UserAddress: address,
  };
  let result = ApiClient.post<CartModel>("Cart/Validate", validateRequest);
  return result;
}
export const cartService = { add, remove, get, clear, getAll, validate };
