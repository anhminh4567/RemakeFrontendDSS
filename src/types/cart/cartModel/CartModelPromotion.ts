import { Clarity, Color, Cut } from "@/types/diamonds/Enums";
import { Promotion } from "@/types/promotion/Promotion";
import { Requirement } from "@/types/requirements/Requirement";
import { DiamondOrigin } from "@/types/shared/DiamondOrigin";
import { TargetType } from "@/types/shared/TargetType";

export interface CartModelPromotion {
  Promotion?: Promotion;
  IsHavingPromotion: boolean;
  RequirementProductsIndex: number[];
  GiftProductsIndex: number[];
  MissingGifts: MissingGift[];
  MissingRequirement?: Requirement[] | null;
  IsPromotionValidTobeUsed: boolean;
}

interface MissingGift {
  GiftType: TargetType; // Assuming TargetType enum is defined
  TotalQuantity: number;
  TakenQuantity: number;
  MissingQuantity: number;
  GiftTakenProductIndex: number[];
  GiftId?: string;
  DiamondGifts?: MissingDiamondGift;
}

interface MissingDiamondGift {
  DiamondGiftShapes?: string[];
  DiamondOrigin?: DiamondOrigin;
  CaratFrom?: number; // float becomes number
  CaratTo?: number;
  ClarityFrom?: Clarity;
  ClarityTo?: Clarity;
  CutFrom?: Cut;
  CutTo?: Cut;
  ColorFrom?: Color;
  ColorTo?: Color;
}
