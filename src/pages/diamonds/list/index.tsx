import {
  GetDiamondPaging,
  GetDiamondPagingRequest,
} from "@/services/diamonds/getPaging";
import { Diamond } from "@/types/diamonds/Diamond";
import { useEffect, useState } from "react";
import DiamondIcon from "@/assets/icons/DiamondIcon.png";
import DiamondFilter from "../DiamondFilter";
import { Pagination, PaginationProps } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const DiamondList = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagingRequest, setPagingRequest] =
    useState<GetDiamondPagingRequest | null>(null);
  //const [size, setSize] = useState<number>(5);
  const getData = async (reqBody?: GetDiamondPagingRequest) => {
    const [response] = await Promise.all([
      GetDiamondPaging(false, !reqBody ? {} : reqBody),
    ]);
    if (response.isSuccess) {
      let resultedDiamond = response.data.Values;
      //setDiamonds((prevList) => [...prevList, ...resultedDiamond]);
      setDiamonds(resultedDiamond);
      setTotalPage(response.data.TotalPage);
      setPage(response.data.CurrentPage);
      setTotalCount(response.data.TotalCount);
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
      start: page,
    };
    setPagingRequest(requestBody);
    console.log("this get data from filter is called");
    getData(requestBody);
  };
  const handlePageChange: PaginationProps["onChange"] = (pageNow, pageSize) => {
    console.log(`current page: ${pageNow} ; size=${pageSize}`);
    setPage(pageNow - 1);
    setPagingRequest({
      ...pagingRequest,
      start: pageNow - 1,
    });
  };
  const handleCardClick = (_, diamond: Diamond) => {
    let currentPath = location.pathname;
    navigation(`${currentPath}/${diamond.Id}`);
  };
  useEffect(() => {
    getData(pagingRequest);
  }, [page]);
  return (
    <>
      <DiamondFilter onFilterChange={filterChangeHandler} />

      <div className="grid grid-cols-4 gap-3 mx-3">
        {diamonds.map((diamond) => (
          <DiamondCard diamond={diamond} onClickCard={handleCardClick} />
        ))}
      </div>
      <div className="flex flex-row justify-center items-center my-4">
        <Pagination
          showTotal={(total, range) => {
            return (
              <span>{`${range[0]}-${range[1]} of ${total} items, ${totalPage} pages total`}</span>
            );
          }}
          defaultPageSize={10}
          defaultCurrent={page + 1}
          onChange={handlePageChange}
          total={totalCount}
          itemRender={(_, type, originalElement) => {
            if (type === "prev") {
              return (
                <a className="text-black hover:text-main-gold text-center h-full flex flex-col justify-center items-center">
                  <FaArrowLeft />{" "}
                </a>
              );
            }
            if (type === "next") {
              return (
                <a className="text-black hover:text-main-gold text-center h-full flex flex-col justify-center items-center">
                  <FaArrowRight />
                </a>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </>
  );
};

export interface DiamondCardProps {
  diamond: Diamond;
  onClickCard?: (e: React.MouseEvent<HTMLDivElement>, diamond: Diamond) => void;
}
function DiamondCard(params: DiamondCardProps) {
  const { diamond, onClickCard } = params;
  const { Thumbnail, Title, TruePrice, SalePrice } = diamond;
  return (
    <div
      className="card w-full bg-base-100 shadow-xl hover:scale-105"
      onClick={(e) => {
        onClickCard(e, diamond);
      }}
    >
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
