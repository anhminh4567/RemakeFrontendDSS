import useCartService from "@/hooks/useCartService";
import EmptyCartComponent from "./components/EmptyCartComponent";
import RoundDiamondPath from "@/assets/icons/diamondShapes/round.png";
import AltDiamondIcon from "@/assets/icons/DiamondIcon.png";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { CartItem } from "@/types/cart/CartItem";
import { WarrantyType } from "@/types/warranty/WarrantyType";
import { Diamond } from "@/types/diamonds/Diamond";
import {
  Clarity,
  Color,
  Culet,
  Cut,
  Fluorescence,
  Girdle,
  Polish,
  Symmetry,
} from "@/types/diamonds/Enums";
import { ProductStatus } from "@/types/shared/ProductStatus";
import { Link } from "react-router-dom";
import CartItemComponent from "./components/CartItemComponent";
import { Formatter } from "@/utils/Formater";
import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
const FAKEDIAMOND_ROUND_NO_SALE: Diamond = {
  Id: "1",
  Carat: 0.15,
  Clarity: Clarity.FL,
  Color: Color.D,
  Culet: Culet.Large,
  Depth: 55,
  DiamondShape: {
    Id: "1",
    ShapeName: "Round",
  },
  DiamondShapeId: "1",
  WidthLengthRatio: 1.1,
  CutOffsetFounded: 2,
  DiscountReducedAmount: 0,
  Fluorescence: Fluorescence.Faint,
  Girdle: Girdle.ExtremelyThick,
  IsLabDiamond: true,
  IsLockForCustomizeRequest: false,
  IsLockForJewelry: false,
  Measurement: "55x55x55",
  Polish: Polish.Excellent,
  PriceOffset: 0,
  PromotionReducedAmount: 0,
  Status: ProductStatus.Active,
  Symmetry: Symmetry.Excellent,
  Table: 55,
  Title: "Diamond round shape 0.15 carat",
  TruePrice: 15000000,
  Cut: Cut.Excellent,
  SalePrice: 15000000,
  SerialCode: "SKU1234",
};
const FAKEDIAMOND_ROUND_SALE: Diamond = {
  Id: "2",
  Carat: 0.25,
  Clarity: Clarity.FL,
  Color: Color.D,
  Culet: Culet.Large,
  Depth: 55,
  DiamondShape: {
    Id: "1",
    ShapeName: "Round",
  },
  DiamondShapeId: "1",
  WidthLengthRatio: 1.1,
  CutOffsetFounded: 2,
  DiscountReducedAmount: 0,
  Fluorescence: Fluorescence.Faint,
  Girdle: Girdle.ExtremelyThick,
  IsLabDiamond: true,
  IsLockForCustomizeRequest: false,
  IsLockForJewelry: false,
  Measurement: "55x55x55",
  Polish: Polish.Excellent,
  PriceOffset: 0,
  SerialCode: "SKU123",
  PromotionReducedAmount: 0,
  Status: ProductStatus.Active,
  Symmetry: Symmetry.Excellent,
  Table: 55,
  Title: "Diamond round shape 0.25 carat",
  TruePrice: 15000000,
  Cut: Cut.Excellent,
  SalePrice: 10000000,
};

const FAKE_CART_ITEMS: CartItem[] = [
  CartItem.CreateDiamondItem(
    "sdafasfd",
    WarrantyType.Diamond,
    "1",
    FAKEDIAMOND_ROUND_SALE,
    RoundDiamondPath
  ),
  CartItem.CreateDiamondItem(
    "sdafasfd2",
    WarrantyType.Diamond,
    "1",
    FAKEDIAMOND_ROUND_NO_SALE,
    RoundDiamondPath
  ),
];
const Cart = () => {
  const { cartItems, clear, error, get, getAll, isLoading, remove } =
    useCartService();
  const handleItemRemove = (item: CartItem) => {
    remove(item.Id);
  };
  const handleClearCart = clear;
  return (
    <div className="w-full h-fit">
      {isLoading && <LoadingSpinner className="w-full h-[500px]" />}
      {/* {cartItems.length <= 0 && <EmptyCartComponent />} */}
      <div className="w-[80%] h-fit mx-auto border mt-11 border-main-gray grid grid-cols-12 gap-3">
        <div className="border border-main-gold col-span-8 p-2 flex flex-col gap-2">
          {FAKE_CART_ITEMS.map((item) => (
            <CartItemComponent Item={item} />
          ))}
        </div>
        <div className="border border-main-gold col-span-4 p-2">
          <p className="font-bold text-sm">Summary</p>
          <div className="px-5 py-3 mt-2 border border-main-gold h-fit sticky top-[--navbar-height-plus-small-padding] text-[13px]">
            <div className="container-detail flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Giá Gốc</p>
                <p>adf</p>
              </div>
              <div className="flex justify-between">
                <p>Phí Vận Chuyển</p>
                <p>adf</p>
              </div>
              <div className="flex justify-between">
                <p>Khách Hàng Thân Thiết</p>
                <p>adf</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold">
                <p className="">Tổng Giá</p>
                <p>{Formatter.FormatMoneyCommaVND(1100000)}₫</p>
              </div>
              <div>
                <MyButton
                  Content={"Thanh Toán"}
                  Size={MyButtonSize.MD}
                  className="w-full mt-2 my-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
