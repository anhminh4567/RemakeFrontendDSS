import { HTMLAttributes } from "react";
import { ImSpinner8 } from "react-icons/im";

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  Content?: React.ReactElement;
}

const DEFAULT_CONTENT: React.ReactElement = (
  <div className="flex flex-col justify-center">
    <ImSpinner8 className="animate-spin text-main-gold w-full h-full " />
    <p className="font-bold text-sm">Loading</p>
  </div>
);
const DEFAULT_PROPS: LoadingSpinnerProps = {
  Content: DEFAULT_CONTENT,
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { className, Content, ...remainProps } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      className={`w-full flex justify-center items-center ${className}`}
      {...remainProps}
    >
      {Content}
    </div>
  );
};

export default LoadingSpinner;
