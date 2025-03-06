import { WarrantyType } from "./WarrantyType";

export type Warranty = {
  Type: WarrantyType;
  Name: string;
  MappedName: string;
  Code: string;
  MonthDuration: number;
  CreateDate: Date;
  Price: number;
  PriceText: string;
};
