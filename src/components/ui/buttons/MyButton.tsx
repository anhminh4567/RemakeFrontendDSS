import { ReactNode } from "react";

export enum MyButtonSize {
  SM = "sm",
  MD = "md",
}
export interface MyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //Text: string;
  Content: ReactNode;
  Size?: MyButtonSize;
  className?: string;
}
const defaultSetting: MyButtonProps = {
  //Text: "",
  Content: "",
  Size: MyButtonSize.MD,
  onClick: () => {},
};
const SizeMD = "px-5 py-2.5 ";
const SizeSM = "btn-sm ";
const MyButton = (params: MyButtonProps) => {
  //const [size, setSize] = useState<string>(SizeMD);
  const mergedSetting: MyButtonProps = {
    ...defaultSetting,
    ...params,
  };
  function CheckButtonClass(): string {
    if (mergedSetting.Size === MyButtonSize.MD) return SizeMD;
    if (mergedSetting.Size === MyButtonSize.SM) return SizeSM;
  }
  const size = CheckButtonClass();
  const { className, Content, onClick, ...mergedSettingWithoutClassName } =
    mergedSetting;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn leading-3 text-white bg-main-gold hover:bg-dark-gold focus:ring-main-gold  font-medium rounded-lg  text-sm ${size}   ${
        !params.className ? "" : params.className
      }`}
      {...mergedSettingWithoutClassName}
    >
      {Content}
    </button>
  );
};

export default MyButton;
