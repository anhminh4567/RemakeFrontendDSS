import {
  GetDiamondPaging,
  GetDiamondPagingRequest,
} from "@/services/diamonds/getPaging";
import { Diamond } from "@/types/diamonds/Diamond";
import { useEffect, useState } from "react";
import DiamondIcon from "@/assets/icons/DiamondIcon.png";
import DiamondFilter from "../DiamondFilter";
import { Pagination } from "flowbite-react";
const DiamondList = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const getData = async (reqBody?: GetDiamondPagingRequest) => {
    // let response = await GetDiamondPaging(false, {});
    // let filterLimit = await GetDiamondFilterLimit();
    const [response] = await Promise.all([
      GetDiamondPaging(false, !reqBody ? {} : reqBody),
    ]);
    if (response.isSuccess) {
      let resultedDiamond = response.data.Values;
      //setDiamonds((prevList) => [...prevList, ...resultedDiamond]);
      setDiamonds(resultedDiamond);
    }
  };
  const filterChangeHandler = (
    colorFrom,
    clarityFrom,
    caratFrom,
    cutFrom,
    priceFrom,
    colorTo,
    clarityTo,
    caratTo,
    cutTo,
    priceTo,
    shapes,
    isNatural
  ) => {
    let requestBody: GetDiamondPagingRequest = {
      "diamond_4C.caratFrom": caratFrom,
      "diamond_4C.caratTo": caratTo,
      "diamond_4C.clarityFrom": clarityFrom,
      "diamond_4C.clarityTo": clarityTo,
      "diamond_4C.colorFrom": colorFrom,
      "diamond_4C.colorTo": colorTo,
      "diamond_4C.cutFrom": cutFrom,
      "diamond_4C.cutTo": cutTo,
      isLab: !isNatural,
      priceStart: priceFrom,
      priceEnd: priceTo,
      shapeId: shapes,
      pageSize: 10,
    };
    console.log("this get data from filter is called");
    getData(requestBody);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <DiamondFilter onFilterChange={filterChangeHandler} />

      <div className="grid grid-cols-4 gap-3 mx-3">
        {diamonds.map((diamond) => (
          <DiamondCard diamond={diamond} />
        ))}
      </div>
      <div className="flex flex-row justify-center my-4">
        <Pagination
          className="text-main-gold bg-main-gray hover:bg-main-gold"
          currentPage={page}
          totalPages={100}
          previousLabel="prev"
          nextLabel="next"
          onPageChange={() => {}}
          showIcons
        />
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
