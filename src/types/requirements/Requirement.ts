import { DiamondSpec } from "../shared/DiamondSpec";
import { Operator } from "../shared/Operator";
import { TargetType } from "../shared/TargetType";

export interface Requirement {
  Id: string;
  PromotionId?: string;
  DiscountId?: string;
  Name: string;
  TargetType: TargetType;
  Operator: Operator;
  Amount?: number; // decimal? becomes number | null
  Quantity?: number; // int? becomes number | null
  JewelryModelId?: string;
  DiamondRequirementSpec?: DiamondSpec;
}
