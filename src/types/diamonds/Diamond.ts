import { Media } from "../Media";
import { ProductLock } from "../shared/ProductLock";
import { ProductStatus } from "../shared/ProductStatus";
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
  Id: string;
  JewelryId?: string;
  DiamondShapeId: string;
  DiamondShape: DiamondShape;
  // warranty?: DiamondWarrantyDto;
  // medias?: DiamondMedia[];
  Clarity: Clarity;
  Color: Color;
  Cut?: Cut;
  PriceOffset: number;
  Carat: number;
  IsLabDiamond: boolean;
  WidthLengthRatio: number;
  Depth: number;
  Table: number;
  Polish: Polish;
  Symmetry: Symmetry;
  Girdle: Girdle;
  Culet: Culet;
  Fluorescence: Fluorescence;
  Measurement: string;
  DiamondPrice?: DiamondPrice;
  Thumbnail?: Media;
  Gallery?: Media[];
  Status: ProductStatus;
  SoldPrice?: number;
  DefaultPrice?: number;
  //discount?: DiscountDto;
  ProductLock?: ProductLock;
  TruePrice: number;
  DiscountReducedAmount: number;
  PromotionReducedAmount: number;
  SerialCode?: string;
  SalePrice?: number;
  Title: string;
  CutOffsetFounded: number;
  //diamondRequest?: DiamondRequestDto;
  //jewelry?: JewelryDto;
  IsLockForJewelry: boolean;
  IsLockForCustomizeRequest: boolean;
};
