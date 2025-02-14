import React, { useState } from "react";
import { Range } from "react-range";
import {
  IRenderMarkParams,
  IRenderThumbParams,
  IRenderTrackParams,
} from "react-range/lib/types";
export type TwoWaySliderProps = {
  Values: number[];
  Min: number;
  Max: number;
  Step: number;
  onChangeHandler: (values: number[]) => void;
  trackNode?: (params: IRenderTrackParams) => React.ReactNode;
  walkerNode?: (params: IRenderThumbParams) => React.ReactNode;
  markNode?: (
    params: IRenderMarkParams,
    values: number[],
    step: number
  ) => React.ReactNode;
};
const defaultTwoSliderProps: TwoWaySliderProps = {
  Values: [1, 8],
  Min: 1,
  Max: 8,
  Step: 1,
  onChangeHandler: () => {},
  trackNode: DefaultTrackNode,
  walkerNode: DefaultWalkerNode,
  markNode: DefaultMarkNode,
};
const TwoWaySlider = (param: TwoWaySliderProps) => {
  param = {
    ...defaultTwoSliderProps,
    ...param,
  };
  const {
    Max,
    Min,
    Step,
    Values,
    onChangeHandler,
    markNode,
    trackNode,
    walkerNode,
  } = param;
  // const [values, setValues] = useState<number[]>(Values);
  const rangeRef: any = React.useRef<Range>();
  return (
    <Range
      ref={rangeRef}
      label="anything"
      step={Step}
      min={Min}
      max={Max}
      values={Values}
      // onChange={(values) => {
      //   setValues(values);
      // }}
      onChange={onChangeHandler}
      renderTrack={(params) => trackNode(params)}
      renderThumb={(params) => walkerNode(params)}
      renderMark={(param) =>
        markNode != null ? markNode(param, Values, Step) : null
      }
    />
  );
};

function DefaultTrackNode({
  props,
  children,
  disabled,
  isDragged,
}: IRenderTrackParams) {
  return (
    <>
      <div
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
        style={{
          ...props.style,
        }}
        className="h-10 relative flex justify-center w-full"
      >
        <div
          {...props}
          className={`w-[80%] h-[2px] bg-main-gray self-center rounded`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
function DefaultWalkerNode({
  props,
  index,
  isDragged,
  value,
}: IRenderThumbParams) {
  return (
    <>
      <div
        {...props}
        key={props.key}
        draggable={true}
        className="w-4 h-4 rounded-full bg-main-gold  hover:border hover:border-spacing-3 hover:border-main-gray focus-visible:outline-none"
      />
    </>
  );
}
function DefaultMarkNode(
  { index, props }: IRenderMarkParams,
  values: number[],
  steps: number
) {
  return (
    <>
      <div
        {...props}
        key={props.key}
        style={{
          ...props.style,
        }}
        className={`w-2 h-2 rounded-full mt-0 relative ${
          index * steps >= values[0] && index * steps < values[1]
            ? "bg-main-gold"
            : "bg-main-gray"
        }`}
      >
        <p className="text-small absolute -bottom-5 left-0">{index}</p>
      </div>
    </>
  );
}

export default TwoWaySlider;
