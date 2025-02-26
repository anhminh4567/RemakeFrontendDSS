import { userCartKVP } from "@/constants/storageKey";
import { CartItem } from "@/types/cart/CartItem";
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
function getAll() {
  let currentItems = JSON.parse(
    localStorage.getItem(userCartKVP)
  ) as CartItem[];
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
export const cartService = { add, remove, get, clear, getAll };
