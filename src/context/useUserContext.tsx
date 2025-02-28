import { UserContextType } from "@/types/context/UserContextType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./useAuthContext";
import { Account } from "@/types/accounts/Account";
import { CartItem } from "@/types/HttpRequests/cart/CartItemRequest";

const UserContext = createContext<UserContextType>(
  UserContextType.createDefault()
);

export function useUserContext() {
  const context = useContext(UserContext);
  return context;
}
export function UserProvider({ children }: { children: ReactNode }) {
  const [userContext, setUserContxt] = useState<UserContextType>(
    UserContextType.createDefault()
  );
  const { user } = useAuthContext();
  function setAcc(acc: Account) {
    setUserContxt({
      ...userContext,
      Account: acc,
      IsAnonymouse: false,
    });
  }

  function addToCart(item: CartItem) {
    this.Cart.push(item);
  }
  function removeFromCart(id: string) {
    let idx = this.Cart.findIndex((item) => item.id == id);
    this.Cart.splice(idx, 0);
  }
  useEffect(() => {
    if (user) {
      setAcc(user);
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider
        value={{
          Account: user,
          Cart: userContext.Cart,
          IsAnonymouse: userContext.IsAnonymouse,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
