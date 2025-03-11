import MyInput from "@/components/form/MyInput";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { LocationService } from "@/services/locations";
import { Address } from "@/types/accounts/Account";
import { Province } from "@/types/location/Province";
import { Radio, Select } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const options: CheckboxGroupProps<boolean>["options"] = [
  { label: "Nhan Tai Cua Hang", value: true },
  { label: "Nhan Tai Quay", value: false },
];
const CheckoutCart = () => {
  const [searchParams, _] = useSearchParams();
  const [provinces, setProvince] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province>(null);
  const [address, setAddress] = useState<Address>(new Address());
  const handleProvinceChange = (val: string) => {
    setSelectedProvince(provinces.filter((x) => x.Id == val).pop());
    setAddress({ ...address, Province: val });
  };
  useEffect(() => {
    async function getData() {
      let result = await LocationService.getProvince();
      if (result.isSuccess) setProvince(result.data);
    }
    getData();
  }, []);
  return (
    <Suspense
      fallback={
        <>
          <LoadingSpinner className="w-[80%] shadow-md h-[500px]" />
        </>
      }
    >
      <div className="w-[90%] h-[500px] mx-auto  mt-11 shadow-lg ">
        <div className="  grid grid-cols-12 gap-3 h-full">
          <div className="col-span-7 h-full border border-black p-4">
            <span>Thông tin thanh toán và giao hàng</span>
            <div className="flex justify-between my-1">
              <MyInput type="text" placeholder="Ho" className=" p-1 " />
              <MyInput type="text" placeholder="Ten" className=" p-1 " />
            </div>
            <Radio.Group
              className="my-1"
              block
              options={options}
              defaultValue={true}
              optionType="button"
              buttonStyle="solid"
            />
            <div className="locationdata">
              <Select
                placeholder="thanh pho"
                className="w-full"
                onChange={handleProvinceChange}
                options={provinces.map<{
                  value: string;
                  label: string;
                  disabled: boolean;
                }>((p) => {
                  return {
                    value: p.Id,
                    label: p.Name,
                    disabled: false,
                  };
                })}
              />
              <MyInput className="w-full" type="text" placeholder="quan" />
              <MyInput className="w-full" type="text" placeholder="huyen" />
              <MyInput className="w-full" type="text" placeholder="dia chi" />
            </div>
          </div>
          <div className="col-span-5 h-full border border-black"></div>
        </div>
      </div>
    </Suspense>
  );
};

export default CheckoutCart;
