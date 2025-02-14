import { WarrantyType } from "@/types/WarrantyType";
import { IdGen } from "@/utils/IdGenerator";

export class CartItem {
  id: string;
  jewelryId?: string | null;
  diamondId?: string | null;
  jewelryModelId?: string | null;
  sizeId?: string | null;
  metalId?: string | null;
  sideDiamondChoices: string[];
  engravedText?: string | null;
  engravedFont?: string | null;
  warrantyCode?: string | null;
  warrantyType?: WarrantyType | null; // Assuming WarrantyType is defined elsewhere
  constructor() {
    this.id = IdGen.create();
  }
  static diamond(diamondId: string, warrantyCode: string): CartItem {
    let result = new CartItem();
    result.diamondId = diamondId;
    result.warrantyCode = warrantyCode;
    return result;
  }
}
