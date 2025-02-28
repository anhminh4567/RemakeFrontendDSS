import { CartItem } from "@/types/cart/CartItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import AltDiamondIcon from "@/assets/icons/DiamondIcon.png";
export interface CartItemProps {
  Item: CartItem;
  onRemoveClick?: (item: CartItem) => void;
}
const CartItemComponent = (props: CartItemProps) => {
  const [item] = useState<CartItem>(props.Item);
  return (
    <>
      {item.isDiamond() && (
        <div className="w-full border border-mainBlue h-fit itemContainer ">
          <div className="w-full shadow-lg rounded-lg p-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-light">
                Diamond {!item.isDiamondAttach() && "(Loose)"}
              </p>
              <span className="text-small text-gray-400 font-bold">
                <Link
                  to={{
                    pathname: `/diamond/${item.DiamondId}`,
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
              <div className="border rounded-md  flex-[0.3]">
                <img
                  className="max-h-36 max-w-36 min-h-36 min-w-36 object-center"
                  src={item.ThumbnailPath}
                  alt={AltDiamondIcon}
                />
              </div>
              <div className="flex-[0.65] border border-main-gray flex flex-col justify-start gap-4">
                <p className="text-small font-light">{item.Diamond.Title}</p>
                <p className="text-small font-light">
                  {item.Diamond.SerialCode}
                </p>
                <div className="text-small flex justify-start gap-2 items-center ">
                  {item.Diamond.SalePrice != item.Diamond.TruePrice ? (
                    <>
                      <p className="text-[10px] line-through">
                        {item.Diamond.TruePrice}
                      </p>
                      <p className="">{item.Diamond.SalePrice}</p>
                    </>
                  ) : (
                    <>
                      <p>{item.Diamond.TruePrice}</p>
                    </>
                  )}
                </div>
                <div className="text-small">Warranty: {item.WarrantyCode}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemComponent;
