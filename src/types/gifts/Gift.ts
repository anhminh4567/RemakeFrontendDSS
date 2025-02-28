import { DiamondSpec } from "../shared/DiamondSpec";
import { TargetType } from "../shared/TargetType";
import { UnitType } from "../shared/UnitType";

export interface Gift {
  Id: string;
  PromotionId: string;
  Name: string;
  TargetType: TargetType;
  ItemCode?: string;
  UnitType: UnitType;
  UnitValue: number; // decimal becomes number
  Amount: number; // int becomes number
  DiamondRequirementSpec?: DiamondSpec;
}
