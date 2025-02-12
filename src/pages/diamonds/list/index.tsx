import { GetDiamondPaging } from "@/services/diamonds/getPaging";
import { Diamond } from "@/types/diamonds/Diamond";
import { useEffect, useState } from "react";
import DiamondIcon from "@/assets/icons/DiamondIcon.png";
const DiamondList = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  useEffect(() => {
    const getData = async () => {
      let response = await GetDiamondPaging(false, {});
      if (response.isSuccess) {
        let resultedDiamond = response.data.Values;
        setDiamonds((prevList) => [...prevList, ...resultedDiamond]);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className=" w-full h-[300px] text-center ">
        <p className="my-auto">filter</p>
      </div>
      <div className="grid grid-cols-4 gap-3 mx-3">
        {diamonds.map((diamond, i) => (
          <DiamondCard diamond={diamond} />
        ))}
      </div>
    </>
  );
};

function DiamondCard({ diamond }: { diamond: Diamond }) {
  const { Thumbnail, Title, TruePrice, SalePrice } = diamond;
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:scale-105">
      <div>
        <img
          src={
            !Thumbnail || !Thumbnail?.MediaPath
              ? DiamondIcon
              : Thumbnail.MediaPath
          }
          alt="Shoes"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title text-sm">
          <p className="overflow-hidden ">{Title}</p>
        </h2>
        {/* <div className="badge badge-secondary">NEW</div> */}

        {/* <p>If a dog chews shoes whose shoes does he choose?</p>
         */}
        <div className="card-actions  justify-start">
          <div className="badge badge-sm">{TruePrice}</div>
          <div className="badge badge-sm">{SalePrice}</div>
        </div>
      </div>
    </div>
  );
}
export default DiamondList;
