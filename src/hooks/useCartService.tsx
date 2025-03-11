import { useUserContext } from "@/context/useUserContext";
import { cartService } from "@/services/carts";
import { Account } from "@/types/accounts/Account";
import { CartItem } from "@/types/cart/CartItem";
import { CartModel } from "@/types/cart/cartModel/CartModel";
import { AddressRequest } from "@/types/HttpRequests/AddressRequest";
import { Promotion } from "@/types/promotion/Promotion";
import { PaymentType } from "@/types/shared/PaymentType";
import { useEffect, useState } from "react";

const useCartService = () => {
  const { Account } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(true);
  const [validateError, setValidateError] = useState<any>(null);
  const [_, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<any>(null);
  const [validateResult, setValidateResult] = useState<CartModel | null>(null);
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
  async function validateCart(
    cartItems: CartItem[],
    paymentType?: PaymentType,
    promotion?: Promotion,
    user?: Account,
    address?: AddressRequest
  ) {
    try {
      setIsValidating(true);
      setValidateError(null);
      setValidateResult(null);
      let validateResult = await cartService.validate(
        cartItems,
        paymentType,
        promotion,
        user,
        address
      );
      if (validateResult.isSuccess == false)
        throw new Error(validateResult.error.message);
      else setValidateResult(validateResult.data);
    } catch (err: any) {
      setValidateError(err);
    } finally {
      setIsValidating(false);
    }
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
    let prodId = setTimeout(() => {
      let items = getAll();
      let address = Account ? Account.getDefaultAddress() : null;
      getCartItems();
      validateCart(items, null, null, Account, address);
    }, 1000);
    return () => {
      clearTimeout(prodId);
    };
  }, []);

  return {
    isLoading,

    error,
    validateResult,
    isValidating,
    validateError,
    get,
    getAll,
    add,
    remove,
    clear,
    validateCart,
  };
};

export default useCartService;
