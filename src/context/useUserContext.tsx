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
import { cartService } from "@/services/carts";

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
  function setCart() {
    let result = cartService.getAll();
    setUserContxt((prevValue) => ({
      ...prevValue,
      Cart: result,
    }));
  }
  useEffect(() => {
    if (user) {
      setAcc(user);
    }
    setCart();
  }, [user]);

  return (
    <>
      <UserContext.Provider
        value={{
          Account: user ? Account.fromOldObject(user) : null,
          Cart: userContext.Cart,
          IsAnonymouse: userContext.IsAnonymouse,
          // addToCart: addToCart,
          // removeFromCart: removeFromCart,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
