import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
import MySecondaryButton from "@/components/ui/buttons/MySecondaryButton";
import MyBadge from "@/components/ui/MyBadge";
import { Diamond } from "@/types/diamonds/Diamond";
import { Clarity, Color, Cut } from "@/types/diamonds/Enums";
import { Warranty } from "@/types/warranty/Warranty";
import { getEnumStringFromNumber } from "@/utils/enumUtils";
import { Formatter } from "@/utils/Formater";
import { Collapse, Dropdown } from "antd";

import { useEffect, useState } from "react";

export interface RightProps {
  diamond: Diamond;
  warrantyList: Warranty[];
  onAddToCart?: (diamond: Diamond, selectedWarranty: Warranty) => void;
}
const Right = (props: RightProps) => {
  const [diamond, setDiamond] = useState<Diamond | null>(props.diamond);
  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(
    null
  );
  const [warrantyList, setWarrantyList] = useState<Warranty[]>(
    props.warrantyList
  );
  useEffect(() => {
    setDiamond(props.diamond);
    setWarrantyList(props.warrantyList);
    if (props.warrantyList.length > 0)
      setSelectedWarranty(props.warrantyList[0]);
  }, [props]);
  return (
    <div>
      <div className="detail-title">
        <h5 className="w-[80%] text-lg font-thin">{diamond.Title}</h5>
        <div className="4C-badge w-full h-full flex gap-2 mt-4">
          <MyBadge
            Content={`${getEnumStringFromNumber(diamond.Color, Color)} color`}
            Size="sm"
            className="text-small"
          />
          <MyBadge
            Content={`${getEnumStringFromNumber(
              diamond.Clarity,
              Clarity
            )} clarity`}
            Size="sm"
            className="text-small"
          />
          {diamond.Cut && (
            <MyBadge
              Content={`${getEnumStringFromNumber(diamond.Cut, Cut)} cut`}
              Size="sm"
              className="text-small"
            />
          )}
          <MyBadge
            Content={`${diamond.Carat}ct`}
            Size="sm"
            className="text-small"
          />
        </div>
        {/* conditionally render the price if sale or not
         */}
        {diamond.SalePrice != diamond.TruePrice ? (
          <div className="my-4">
            <p className="text-small font-light cross line-through">
              {Formatter.FormatMoneyCommaVND(diamond.SalePrice)}.đ
            </p>
            <p className="">
              {Formatter.FormatMoneyCommaVND(diamond.TruePrice)}.đ
            </p>
          </div>
        ) : (
          <p className="my-4">
            {Formatter.FormatMoneyCommaVND(diamond.TruePrice)}.đ
          </p>
        )}
        <div>
          <Dropdown
            className="w-fit p-0"
            menu={{
              items: warrantyList.map((warranty: Warranty) => {
                return {
                  key: warranty.Code,
                  label: (
                    <div className="w-fit text-center text-black p-2 text-small">
                      {warranty.MappedName}
                    </div>
                  ),
                };
              }),
              onClick: (menuInfo) => {
                let itemCode = menuInfo.key;
                let warranty = warrantyList
                  .filter((x) => x.Code == itemCode)
                  .pop();
                if (warranty) setSelectedWarranty(warranty);
              },
              selectable: true,
              defaultSelectedKeys: [selectedWarranty?.Code],
            }}
          >
            <div className="w-full text-small border border-main-gold rounded-md p-3 text-center ">
              {selectedWarranty?.MappedName}
            </div>
          </Dropdown>
        </div>
      </div>
      <hr className="w-full h-[1px] my-5" />
      <div className="button-add-details">
        <MyButton
          onClick={() => {
            if (props.onAddToCart) props.onAddToCart(diamond, selectedWarranty);
          }}
          Size={MyButtonSize.MD}
          Content={"Thêm vào giỏ hàng"}
          className="text-center text-nowrap text-md font-bold w-full rounded-sm text-black"
        />
        <MySecondaryButton
          Size={MyButtonSize.MD}
          Content={"Contact Expert"}
          className="w-full rounded-sm"
        />
      </div>
      <hr className="w-full h-[1px] my-5" />
      <div className="extra-product-detail">
        <Collapse
          className="bg-transparent font-bold"
          items={[
            {
              key: 0,
              label: "Chi tiết sản phẩm",
              children: (
                <p className="font-light">
                  Viên kim cương ${diamond.DiamondShape.ShapeName} $
                  {diamond.Carat}.ct này chỉ được bán tại Cửa hàng Kim cương.
                </p>
              ),
            },
          ]}
          bordered={false}
        />
        <Collapse
          className="bg-transparent font-bold"
          items={[
            {
              key: 1,
              label: "Báo cáo phân loại GIA",
              children: (
                <p className="font-light">
                  Đây là báo cáo ghi nhận các đặc điểm cụ thể của viên kim
                  cương, do GIA cấp, một trong những tổ chức được kính trọng
                  nhất trong ngành kim cương.
                </p>
              ),
            },
          ]}
          bordered={false}
        />
      </div>
    </div>
  );
};

export default Right;
