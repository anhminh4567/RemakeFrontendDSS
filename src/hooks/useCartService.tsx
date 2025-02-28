import { cartService } from "@/services/carts";
import { CartItem } from "@/types/cart/CartItem";
import { useEffect, useState } from "react";

const useCartService = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<any>(null);

  const get = cartService.get;
  const getAll = cartService.getAll;
  const remove = (itemId: string) => {
    cartService.remove(itemId);
    setCartItems(getAll());
  };
  const clear = () => {
    cartService.clear();
    setCartItems(getAll());
  };
  const add = (item: CartItem): boolean => {
    if (isValidItemBeforeAdd(item) == false) {
      return false;
    }
    cartService.add(item);
    setCartItems(getAll());
    return true;
  };
  function isValidItemBeforeAdd(item: CartItem): boolean {
    if (
      !item.Id ||
      (!item.DiamondId && !item.JewelryId) ||
      !item.WarrantyCode ||
      !item.WarrantyType
    ) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    const getCartItems = async () => {
      try {
        let items = cartService.getAll();
        setCartItems(items);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    let prodId = setTimeout(getCartItems, 1000);
    return () => {
      clearTimeout(prodId);
    };
  }, []);

  return {
    isLoading,
    cartItems,
    error,
    get,
    getAll,
    add,
    remove,
    clear,
  };
};

export default useCartService;
