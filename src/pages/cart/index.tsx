import useCartService from "@/hooks/useCartService";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import { CartItem } from "@/types/cart/CartItem";

import CartItemComponent from "./components/CartItemComponent";
import { Formatter } from "@/utils/Formater";
import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
import { CartProduct } from "@/types/cart/cartModel/CartProduct";

const Cart = () => {
  const { clear, remove, isValidating, validateError, validateResult } =
    useCartService();

  const handleItemRemove = (item: CartProduct) => {
    remove(item.CartProductId);
  };
  const handleClearCart = clear;
  return (
    <div className="w-full h-fit">
      {/* {isLoading && <LoadingSpinner className="w-full h-[500px]" />} */}
      {/* {cartItems.length <= 0 && <EmptyCartComponent />} */}
      {/* {!isLoading && !error && ( */}
      <>
        <div className="w-[80%] h-fit mx-auto  mt-11 ">
          <span
            className="text-sm text-gray-400 font-bold hover:cursor-pointer"
            onClick={handleClearCart}
          >
            Clear
          </span>
          <div className="  grid grid-cols-12 gap-3">
            <div className=" col-span-8 p-2 flex flex-col gap-2">
              {isValidating && (
                <>
                  <LoadingSpinner className="w-full h-96 bg-white shadow-md" />
                </>
              )}
              {validateError && (
                <>
                  <p className="w-full h-32 text-red-500">
                    {(validateError as Error).message}
                  </p>
                </>
              )}
              {!isValidating && !validateError && (
                <>
                  {validateResult.Products.map((product) => (
                    <CartItemComponent
                      Item={product}
                      onRemoveClick={handleItemRemove}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="right col-span-4 p-2">
              <div className="sticky top-[--navbar-height-plus-small-padding]">
                <p className="font-bold text-sm">Summary</p>
                <div className="px-5 py-3 mt-2 shadow-lg h-fit  text-[13px]">
                  {isValidating && (
                    <>
                      <LoadingSpinner className="w-full h-80" />
                    </>
                  )}
                  {validateError && (
                    <>
                      <p className="w-full h-32 text-red-500">
                        {(validateError as Error).message}
                      </p>
                    </>
                  )}
                  {!isValidating && !validateError && (
                    <>
                      <div className="container-detail flex flex-col gap-2">
                        <div className="flex justify-between">
                          <p>Giá Gốc</p>
                          <p>
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.DefaultPrice
                            )}
                            ₫
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Phí Vận Chuyển</p>
                          <p>
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.FinalShippingPrice
                            )}
                            ₫
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Khách Hàng Thân Thiết</p>
                          <p>
                            -
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.UserRankDiscountAmount
                            )}
                            ₫
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Giảm giá</p>
                          <p>
                            -
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.DiscountAmountSaved
                            )}
                            ₫
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p>Khuyến mãi</p>
                          <p>
                            -
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.PromotionAmountSaved
                            )}
                            ₫
                          </p>
                        </div>

                        <hr className="my-4" />
                        <div className="flex justify-between font-bold">
                          <p className="">Tổng Giá</p>
                          <p>
                            {Formatter.FormatMoneyCommaVND(
                              validateResult.OrderPrices.FinalPrice
                            )}
                            ₫
                          </p>
                        </div>
                        <div>
                          <MyButton
                            Content={"Thanh Toán"}
                            Size={MyButtonSize.MD}
                            className="w-full mt-2 my-0"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <p className="font-bold text-sm my-2">Danh Sách Khuyến Mãi</p>

                <div className="shadow-md w-full h-48 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Cart;
