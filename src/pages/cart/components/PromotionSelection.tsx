import MyBadge from "@/components/ui/MyBadge";
import { PromoResponse } from "@/types/promotion/ApplicablePromotion";
import { Promotion } from "@/types/promotion/Promotion";
import { DiscountPromotionStatus } from "@/types/shared/DiscountPromotionStatus";
import { getEnumStringFromNumber } from "@/utils/enumUtils";
import { Modal, ModalProps, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";

const columns: TableColumnsType<PromoResponse> = [
  {
    title: "Name",
    dataIndex: "PromotionDto.Id",
    render: (_, record) => (
      <>
        <p>{record.PromotionDto.Name}</p>
      </>
    ),
  }, //key: "Promotion.Name" },
  // Table.EXPAND_COLUMN,
  {
    title: "Code",
    dataIndex: "PromotionDto.PromoCode",
    render: (_, record) => (
      <>
        <p>{record.PromotionDto.PromoCode}</p>
      </>
    ),
  }, //key: "Promotion.PromoCode" },
  {
    title: "Status",
    dataIndex: "PromotionDto.Status",
    render: (_, record) => (
      <>
        <p>
          <MyBadge
            Content={getEnumStringFromNumber(
              record.PromotionDto.Status,
              DiscountPromotionStatus
            )}
            Size="sm"
            className="!bg-green-400"
          />
        </p>
      </>
    ),
  },
  {
    title: "Applicable",
    dataIndex: "IsApplicable",
    render: (_, record) => (
      <>
        <p>
          {record.IsApplicable ? (
            <MyBadge Size="sm" Content={"Yes"} className="!bg-green-400" />
          ) : (
            <MyBadge Size="sm" Content={"No"} className="!bg-red-500" />
          )}
        </p>
      </>
    ),
  },
];
export interface PromotionSelectionModalProps extends ModalProps {
  Promotions: PromoResponse[];
  SelectedPromotion?: Promotion;
  onPromotionSelected: (promotion: PromoResponse) => boolean;
}
const PromotionSelectionModal = (params: PromotionSelectionModalProps) => {
  const { Promotions, SelectedPromotion, onPromotionSelected, ...remain } =
    params;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    if (Promotions) {
      let result = Promotions.filter(
        (x) => x.PromoId == SelectedPromotion?.Id
      ).pop();
      if (result) setSelectedRowKeys([result.PromoId]);
    }
    console.log(Promotions);
  }, [Promotions, SelectedPromotion]);
  return (
    <div className="w-full">
      <Modal {...remain}>
        <Table<PromoResponse>
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.PromotionDto.Description}</p>
            ),
            //rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={Promotions}
          rowSelection={{
            type: "radio",
            onSelect: (record) => {
              if (onPromotionSelected) {
                let isSucces = onPromotionSelected(record);
                if (isSucces) setSelectedRowKeys([record.PromoId]);
              }
            },
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: PromoResponse[]
            ) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
            selectedRowKeys: selectedRowKeys,
          }}
          rowKey={"PromoId"}
        />
      </Modal>
    </div>
  );
};

export default PromotionSelectionModal;
