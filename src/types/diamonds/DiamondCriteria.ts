import { DiamondShape } from "./DiamondShape";

export type DiamondCriteria = {
  id: string;
  caratFrom: number;
  caratTo: number;
  shape?: DiamondShape;
  shapeId: string;
};
