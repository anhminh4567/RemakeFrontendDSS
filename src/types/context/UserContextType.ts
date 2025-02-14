import { Account } from "../Account";
import { CartItem } from "../HttpRequests/cart/CartItemRequest";

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
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
}
