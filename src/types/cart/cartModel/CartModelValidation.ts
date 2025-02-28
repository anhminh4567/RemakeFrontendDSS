export interface CartModelValidation {
  IsOrderValid: boolean;
  IsShippingValid: boolean;
  InvalidItemIndex: number[];
  UnavailableItemIndex: number[];
  MainErrorMessage: string[];
}
