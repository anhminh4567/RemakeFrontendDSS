import { Account } from "../accounts/Account";
import { CartItem } from "../cart/CartItem";

export class UserContextType {
  Account?: Account;
  Cart: CartItem[];
  IsAnonymouse: boolean;
  constructor() {
    this.IsAnonymouse = true;
    this.Cart = [];
  }
  static createDefault() {
    return new UserContextType();
  }
  // addToCart: (item: CartItem) => void;
  // removeFromCart: (id: string) => void;
}
