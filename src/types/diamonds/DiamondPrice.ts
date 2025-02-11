import { DiamondCriteria } from "./DiamondCriteria";
import { DiamondShape } from "./DiamondShape";
import { Clarity, Color, Cut } from "./Enums";

export class DiamondPrice {
  id: string;
  shapeId: string;
  criteriaId: string;
  criteria: DiamondCriteria;
  shape: DiamondShape;
  price: number;
  discountPrice?: number;
  //discount?: Discount;
  forUnknownPrice: string;
  cut?: Cut;
  clarity?: Clarity;
  color?: Color;
  isLabDiamond: boolean;
  isSideDiamond: boolean;
}
