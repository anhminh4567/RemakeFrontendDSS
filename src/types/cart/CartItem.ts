import { IdGen } from "@/utils/IdGenerator";
import { WarrantyType } from "../warranty/WarrantyType";
import { Diamond } from "../diamonds/Diamond";
import { Warranty } from "../warranty/Warranty";

export class CartItem {
  public Id: string;
  public JewelryId?: string;
  public DiamondId?: string;
  public JewelryModelId?: string;
  public SizeId?: string;
  public MetalId?: string;
  public SideDiamondChoices?: string[] = [];
  public EngravedText?: string;
  public EngravedFont?: string;
  public WarrantyCode?: string;
  public WarrantyType?: WarrantyType;
  public ThumbnailPath?: string;
  // for web purpose
  public Diamond?: Diamond;
  public Warranty?: Warranty;
  //   constructor(
  //     id: string,
  //     jewelryId: string | null = null,
  //     diamondId: string | null = null,
  //     jewelryModelId: string | null = null,
  //     sizeId: string | null = null,
  //     metalId: string | null = null,
  //     sideDiamondChoices: string[] = [],
  //     engravedText: string | null = null,
  //     engravedFont: string | null = null,
  //     warrantyCode: string | null = null,
  //     warrantyType: WarrantyType | null = null
  //   ) {
  //     this.Id = id;
  //     this.JewelryId = jewelryId;
  //     this.DiamondId = diamondId;
  //     this.JewelryModelId = jewelryModelId;
  //     this.SizeId = sizeId;
  //     this.MetalId = metalId;
  //     this.SideDiamondChoices = sideDiamondChoices;
  //     this.EngravedText = engravedText;
  //     this.EngravedFont = engravedFont;
  //     this.WarrantyCode = warrantyCode;
  //     this.WarrantyType = warrantyType;
  //   }
  private constructor(id: string) {
    this.Id = id;
  }
  static CreateDiamondItem(
    diamondId: string,
    warrantyType: WarrantyType,
    warrantyCode: string,
    Diamond: Diamond,
    thumbnailPath?: string
  ): CartItem {
    let newItem = new CartItem(IdGen.create());
    if (!diamondId || !warrantyType)
      throw new Error("field incorrect for diamond item");
    newItem.DiamondId = diamondId;
    newItem.WarrantyType = warrantyType;
    newItem.WarrantyCode = warrantyCode;
    newItem.ThumbnailPath = thumbnailPath;
    newItem.Diamond = Diamond;
    return newItem;
  }
  static isDiamond(item: CartItem) {
    return item.DiamondId != null && item.Diamond != null;
  }
  static isDiamondAttach(item: CartItem) {
    return CartItem.isDiamond(item) && item.JewelryId != null;
  }
  setWarranty(warranty: Warranty) {
    this.Warranty = warranty;
    this.WarrantyCode = warranty.Code;
    this.WarrantyType = warranty.Type;
  }
}
