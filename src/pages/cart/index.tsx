import ShopIconPath from "@/assets/icons/ShopIcon.png";
import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <div>
      <EmptyCartComponent />
    </div>
  );
};

const EmptyCartComponent = () => {
  return (
    <>
      <div className="w-full h-[500px] shadow-md grid place-items-center ">
        <div className="w-[50%] h-[50%] flex flex-col items-center ">
          <img
            src={ShopIconPath}
            className=" max-w-32 self-center object-contain"
          />
          <p className="my-4 mb-1">Giỏ Hàng Trống</p>
          <Link to="/">
            <MyButton
              Content={"Trang chủ"}
              Size={MyButtonSize.SM}
              className="text-small"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
