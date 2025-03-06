// import { CartItem } from "@/types/cart/CartItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AltDiamondIcon from "@/assets/icons/DiamondIcon.png";
import { Formatter } from "@/utils/Formater";
import { CartProduct } from "@/types/cart/cartModel/CartProduct";
export interface CartItemProps {
  Item: CartProduct;
  onRemoveClick?: (item: CartProduct) => void;
}
const CartItemComponent = (props: CartItemProps) => {
  const [item, setItem] = useState<CartProduct>(props.Item);
  console.log(props.Item);

  useEffect(() => {
    setItem(props.Item);
  }, [props]);
  return (
    <>
      {item.Diamond && ( //CartItem.isDiamond(item)
        <div className="w-full  h-fit itemContainer ">
          <div className="w-full shadow-lg rounded-lg p-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light">
                Kim Cuong {!!item.Diamond && "(Loose)"}
              </p>
              <span className="text-small text-gray-400 font-bold">
                <Link
                  to={{
                    pathname: `/diamond/${item.Diamond?.Id}`,
                  }}
                >
                  view
                </Link>{" "}
                <span> | </span>
                <a
                  href="#"
                  onClick={() => {
                    if (props.onRemoveClick) props.onRemoveClick(item);
                  }}
                >
                  remove{" "}
                </a>
              </span>
            </div>
            <div className="item-detail flex flex-row justify-between">
              <div className="  flex-[0.3]">
                <img
                  className="max-h-36 max-w-36 min-h-36 min-w-36 object-center"
                  src={item.Diamond.Thumbnail?.MediaPath}
                  alt={AltDiamondIcon}
                />
              </div>
              <div className="flex-[0.65]  flex flex-col justify-start gap-4">
                <p className="text-small font-light">{item.Diamond.Title}</p>
                <p className="text-small font-light">
                  SKU: {item.Diamond.SerialCode}
                </p>
                <div className="text-small flex flex-col justify-start gap-2 leading-3 w-[50%] ">
                  <p>
                    Warranty:{" "}
                    {Formatter.FormatMoneyCommaVND(
                      item.ReviewPrice.WarrantyPrice
                    )}
                  </p>
                  <p>
                    Giá Gốc:{" "}
                    {Formatter.FormatMoneyCommaVND(
                      item.ReviewPrice.DefaultPrice
                    )}
                  </p>
                  <p>
                    Giảm giá:{" "}
                    {Formatter.FormatMoneyCommaVND(
                      item.ReviewPrice.DiscountAmountSaved
                    )}
                  </p>
                  <p>
                    Khuyến mãi:{" "}
                    {Formatter.FormatMoneyCommaVND(
                      item.ReviewPrice.PromotionAmountSaved
                    )}
                  </p>
                  <p>
                    Tổng Giá:{" "}
                    {Formatter.FormatMoneyCommaVND(item.ReviewPrice.FinalPrice)}
                  </p>

                  {/* {item.Diamond.SalePrice != item.Diamond.TruePrice ? (
                    <>
                      <p className="text-[10px] line-through">
                        {Formatter.FormatMoneyCommaVND(item.Diamond.TruePrice)}
                      </p>
                      <p className="">
                        {Formatter.FormatMoneyCommaVND(item.Diamond.SalePrice)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        {Formatter.FormatMoneyCommaVND(item.Diamond.TruePrice)}
                      </p>
                    </>
                  )} */}
                </div>
                <div className="text-small">
                  Warranty:{" "}
                  {!item.CurrentWarrantyApplied
                    ? "unselected"
                    : item.CurrentWarrantyApplied.MappedName}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemComponent;
