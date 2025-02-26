import TwoWaySlider from "@/components/ui/TwoWaySlider";
import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
import { GetDiamondFilterLimit } from "@/services/diamonds/getFilterLimit";
import { DiamondFilterLimit } from "@/types/HttpResponses/DiamondFilterLimitResponse";
import { getEnumStringFromNumber } from "@/utils/enumUtils";
import { Clarity, Color, Cut } from "@/types/diamonds/Enums";
import { useEffect, useState } from "react";
import { IRenderMarkParams } from "react-range/lib/types";
import { Formatter } from "@/utils/Formater";
import SHAPES from "@/constants/shapes";
const IMAGE_SM = "w-8 h-8";
//const IMAGE_LG = "w-24 h-24";

export interface DiamondFilterProps {
  delayedWhenFilterChange?: number;
  onFilterChange?: (
    colorFrom: number,
    clarityFrom: number,
    caratFrom: number,
    cutFrom: number,
    priceFrom: number,
    colorTo: number,
    clarityTo: number,
    caratTo: number,
    cutTo: number,
    priceTo: number,
    shapes: string,
    isNatural: boolean
  ) => void;
}
const defaultFilterProps: DiamondFilterProps = {
  delayedWhenFilterChange: 2000,
};
const DiamondFilter = (params: DiamondFilterProps) => {
  params = {
    ...defaultFilterProps,
    ...params,
  };
  const { delayedWhenFilterChange, onFilterChange } = params;
  const [filterLimit, setFilterLimit] = useState<DiamondFilterLimit | null>(
    null
  );
  const [color, setColor] = useState<number[]>([]);
  const [clarity, setClarity] = useState<number[]>([]);
  const [cut, setCut] = useState<number[]>([]);
  const [carat, setCarat] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [shapes, setShapes] = useState<{ Name: string; Id: string }>({
    Name: SHAPES.find((x) => x.Name.toUpperCase() == "ROUND").Name,
    Id: SHAPES.find((x) => x.Name.toUpperCase() == "ROUND")
      .Id as unknown as string,
  });
  const [isNatural, setIsNatural] = useState<boolean>(true);

  const handleShapeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let tryGetValue = e.currentTarget.getAttribute("data-value-shape");
    console.log(tryGetValue);
    setShapes({
      Name: SHAPES.find(
        (x) => x.Name.toUpperCase() == tryGetValue.toUpperCase()
      ).Name,
      Id: SHAPES.find((x) => x.Name.toUpperCase() == tryGetValue.toUpperCase())
        .Id as unknown as string,
    });
  };
  const handleOriginClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    isNaturalDiamond: boolean
  ) => {
    if (isNaturalDiamond == isNatural) {
      //e.currentTarget.focus();
      return;
    } else {
      setIsNatural(isNaturalDiamond);
      e.currentTarget.focus();
    }
  };
  useEffect(() => {
    const getData = async () => {
      const [filterLimitResponse] = await Promise.all([
        GetDiamondFilterLimit(),
      ]);
      if (filterLimitResponse.isSuccess) {
        setFilterLimit(filterLimitResponse.data);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    let promiseId = setTimeout(() => {
      console.log("callback is called");
      onFilterChange(
        color[0],
        clarity[0],
        carat[0],
        cut[0],
        price[0],
        color[1],
        clarity[1],
        carat[1],
        cut[1],
        price[1],
        shapes.Id,
        isNatural
      );
    }, delayedWhenFilterChange);
    console.log("iscalled");
    return () => clearTimeout(promiseId);
  }, [color, clarity, cut, carat, price, isNatural, shapes]);
  useEffect(() => {
    if (filterLimit) {
      setColor([filterLimit.Color.Min, filterLimit.Color.Max]);
      setClarity([filterLimit.Clarity.Min, filterLimit.Clarity.Max]);
      setCarat([filterLimit.Carat.Min, filterLimit.Carat.Max]);
      setCut([filterLimit.Cut.Min, filterLimit.Cut.Max]);
      setPrice([filterLimit.Price.Min, filterLimit.Price.Max]);
    }
  }, [filterLimit]);
  return (
    <>
      {filterLimit && (
        <>
          <div className=" w-full  text-center m-3 pt-2 ">
            <div className="h-48 ">
              <div className="w-[30%] h-full flex flex-row mx-auto text-small items-center gap-1 ">
                <MyButton
                  Size={MyButtonSize.SM}
                  Content={"Natural"}
                  className={`flex-1 text-small ${
                    isNatural ? "outline outline-main-gray" : ""
                  }  `}
                  onClick={(e) => {
                    handleOriginClick(e, true);
                  }}
                />
                <MyButton
                  Size={MyButtonSize.SM}
                  Content={"Lab"}
                  className={`flex-1 text-small ${
                    !isNatural ? "outline outline-main-gray" : ""
                  }  `}
                  onClick={(e) => {
                    handleOriginClick(e, false);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 grid-flow-row  auto-rows-max ">
              <div>
                Shape
                <div className="">
                  <div className="grid grid-cols-5 text-small ">
                    {SHAPES.map((shape) => (
                      <div
                        className={`flex-none flex flex-col justify-around items-center  my-2 mx-1 p-1 ${
                          shapes.Name == shape.Name
                            ? "outline outline-main-gold rounded-md"
                            : ""
                        }`}
                        data-value-shape={`${shape.Name}`} // Storing value in data attribute
                        onClick={handleShapeClick}
                      >
                        <img className={IMAGE_SM} src={shape.Img as string} />
                        <p className="text-center">{shape.Name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <LocalSliderComponent
                title="Price"
                min={filterLimit.Price.Min}
                max={filterLimit.Price.Max}
                value={price}
                step={1000 * 1000 * 10}
                onChange={(val) => setPrice(val)}
                markNode={() => null}
                showBoxValue={true}
                showBoxValueFormater={(val) => Formatter.FormatMoneyVND(val)}
              />
              <LocalSliderComponent
                title="Carat"
                min={filterLimit.Carat.Min}
                max={filterLimit.Carat.Max}
                value={carat}
                step={0.01}
                onChange={(val) => setCarat(val)}
                markNode={() => null}
                showBoxValue={true}
              />
              <LocalSliderComponent
                title="Color"
                min={filterLimit.Color.Min}
                max={filterLimit.Color.Max}
                value={color}
                step={1}
                onChange={(val) => setColor(val)}
                markNode={(param) => LocalMarkComponent(param, color, 1, Color)}
              />
              <LocalSliderComponent
                title="Clarity"
                min={filterLimit.Clarity.Min}
                max={filterLimit.Clarity.Max}
                value={clarity}
                step={1}
                onChange={(val) => setClarity(val)}
                markNode={(param) =>
                  LocalMarkComponent(param, clarity, 1, Clarity)
                }
              />
              <LocalSliderComponent
                title="Cut"
                min={filterLimit.Cut.Min}
                max={filterLimit.Cut.Max}
                value={cut}
                step={1}
                onChange={(val) => setCut(val)}
                markNode={(param) => LocalMarkComponent(param, cut, 1, Cut)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

function LocalMarkComponent(
  params: IRenderMarkParams,
  values: number[],
  step: number,
  Enum: Record<number, string>
) {
  return (
    <div
      {...params.props}
      key={params.props.key}
      className={`w-[3px] h-3 mt-0 relative ms-1 bg-white`}
    >
      <p className="text-small absolute -bottom-5 left-0">
        {getEnumStringFromNumber(params.index + 1, Enum)}
      </p>
    </div>
  );
}
interface LocalSliderComponentProps {
  showBoxValue?: boolean;
  showBoxValueFormater?: (val: number) => string;
  title: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  markNode?: (params: IRenderMarkParams) => React.ReactNode;
  onChange: (value: number[]) => void;
}
function LocalSliderComponent(params: LocalSliderComponentProps) {
  const {
    markNode,
    max,
    min,
    onChange,
    step,
    title,
    value,
    showBoxValue,
    showBoxValueFormater,
  } = params;
  return (
    <div>
      {title}
      {showBoxValue && (
        <div className="w-full flex flex-row justify-between text-small font-light">
          <div className="ml-5 border border-main-gray rounded-md px-3 py-2 w-20 text-start">
            {!showBoxValueFormater ? value[0] : showBoxValueFormater(value[0])}
          </div>
          <div className="me-5 border border-main-gray rounded-md px-3 py-2 w-20 text-start">
            {!showBoxValueFormater ? value[1] : showBoxValueFormater(value[1])}
          </div>
        </div>
      )}
      <TwoWaySlider
        Max={max}
        Min={min}
        Step={step}
        Values={value}
        onChangeHandler={onChange}
        markNode={markNode}
      />
    </div>
  );
}
export default DiamondFilter;
