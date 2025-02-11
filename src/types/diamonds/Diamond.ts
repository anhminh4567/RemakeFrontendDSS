import { Media } from "../Media";
import { ProductLock } from "../ProductLock";
import { ProductStatus } from "../ProductStatus";
import { DiamondPrice } from "./DiamondPrice";
import { DiamondShape } from "./DiamondShape";
import {
  Clarity,
  Color,
  Culet,
  Cut,
  Fluorescence,
  Girdle,
  Polish,
  Symmetry,
} from "./Enums";

export type Diamond = {
  id: string;
  jewelryId?: string;
  diamondShapeId: string;
  diamondShape: DiamondShape;
  // warranty?: DiamondWarrantyDto;
  // medias?: DiamondMedia[];
  clarity: Clarity;
  color: Color;
  cut?: Cut;
  priceOffset: number;
  carat: number;
  isLabDiamond: boolean;
  widthLengthRatio: number;
  depth: number;
  table: number;
  polish: Polish;
  symmetry: Symmetry;
  girdle: Girdle;
  culet: Culet;
  fluorescence: Fluorescence;
  measurement: string;
  diamondPrice?: DiamondPrice;
  thumbnail?: Media;
  gallery?: Media[];
  status: ProductStatus;
  soldPrice?: number;
  defaultPrice?: number;
  //discount?: DiscountDto;
  productLock?: ProductLock;
  truePrice: number;
  discountReducedAmount: number;
  promotionReducedAmount: number;
  serialCode?: string;
  salePrice?: number;
  title: string;
  cutOffsetFounded: number;
  //diamondRequest?: DiamondRequestDto;
  //jewelry?: JewelryDto;
  isLockForJewelry: boolean;
  isLockForCustomizeRequest: boolean;
};
