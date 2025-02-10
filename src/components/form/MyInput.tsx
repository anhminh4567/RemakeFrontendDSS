import { ReactNode } from "react";

export interface MyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  IconsElement?: ReactNode;
}
const defaultSetting: MyInputProps = {
  type: "text",
};
const MyInput = (params: MyInputProps) => {
  const merged = {
    ...defaultSetting,
    ...params,
  };
  return (
    <>
      <label
        className={`input input-bordered focus-within:border-main-gold focus-within:outline-main-gold focus-within:outline-none border-main-gold focus:border-main-gold focus:border-none focus-visible:out flex items-center gap-2 ${
          merged.className ?? ""
        }`}
      >
        {merged.IconsElement && <span>{merged.IconsElement}</span>}
        <input
          className="text-sm border-none w-full focus:border-none focus:ring-0"
          {...merged}
        />
      </label>
    </>
  );
};

export default MyInput;
