import { WarrantyType } from "./WarrantyType";

export type Warranty = {
  WarrantyType: WarrantyType;
  Name: string;
  LocalizedName: string;
  Code: string;
  MonthDuration: number;
  CreateDate: Date;
  Price: number;
};
