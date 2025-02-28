import { Diamond } from "@/types/diamonds/Diamond";
import { CartProductCheckoutPrice } from "./CartProductChekoutPrice";
import { Warranty } from "@/types/warranty/Warranty";

export interface CartProduct {
  CartProductId: string;
  //Jewelry?: Jewelry | null;
  Diamond?: Diamond;
  //JewelryModel?: JewelryModelDto | null;
  ReviewPrice: CartProductCheckoutPrice;
  CurrentWarrantyApplied: Warranty;
  CurrentWarrantyPrice: number; // decimal becomes number
  EngravedText?: string | null;
  EngravedFont?: string | null;
  // PurchasedPrice?: number | null;
  IsValid: boolean;
  IsDuplicate: boolean;
  ErrorMessage?: string | null;
  IsAvailable: boolean;
  IsProduct: boolean;
  /////////////////////////////////
  /////////////////////////////////
  DiscountId?: string | null;
  DiscountPercent?: number | null;
  IsHavingDiscount: boolean; // Calculated property, see note
  PromotionId?: string | null;
  IsHavingPromotion: boolean; // Calculated property, see note
  RequirementQualifedId?: string | null;
  IsReqirement: boolean; // Calculated property, see note
  GiftAssignedId?: string | null;
  IsGift: boolean; // Calculated property, see note
}

//   // Example of how to calculate the boolean properties in TypeScript:
//   function getIsHavingDiscount(cartProduct: CartProductDto): boolean {
//     return cartProduct.DiscountId !== null && cartProduct.DiscountId !== undefined;
//   }

//   function getIsHavingPromotion(cartProduct: CartProductDto): boolean {
//     return cartProduct.PromotionId !== null && cartProduct.PromotionId !== undefined;
//   }

//   function getIsReqirement(cartProduct: CartProductDto): boolean {
//     return cartProduct.RequirementQualifedId !== null && cartProduct.RequirementQualifedId !== undefined;
//   }

//   function getIsGift(cartProduct: CartProductDto): boolean {
//     return cartProduct.GiftAssignedId !== null && cartProduct.GiftAssignedId !== undefined;
//   }

//   const isHavingDiscount = getIsHavingDiscount(cartProduct);
//   const isHavingPromotion = getIsHavingPromotion(cartProduct);
//   const isReqirement = getIsReqirement(cartProduct);
//   const isGift = getIsGift(cartProduct);

//   console.log(isHavingDiscount, isHavingPromotion, isReqirement, isGift);
