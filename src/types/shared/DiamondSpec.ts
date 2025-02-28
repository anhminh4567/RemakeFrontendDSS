import { Clarity, Color, Cut } from "../diamonds/Enums";
import { DiamondOrigin } from "./DiamondOrigin";

export interface DiamondSpec {
  Origin: DiamondOrigin;
  ShapesIDs: string[];
  CaratFrom: number; // float in C# becomes number in TypeScript
  CaratTo: number;
  ClarityFrom: Clarity;
  ClarityTo: Clarity;
  CutFrom?: Cut;
  CutTo?: Cut;
  ColorFrom: Color;
  ColorTo: Color;
}
