import MyButton, { MyButtonProps } from "./MyButton";

export interface MySecondaryButtonProps extends MyButtonProps {}
const MySecondaryButton = (props: MySecondaryButtonProps) => {
  const { className, ...propsRemain } = props;
  return (
    <MyButton
      {...propsRemain}
      className={`bg-main-gray text-black hover:bg-light-gray focus:ring-light-gray hover:text-black  ${className}`}
    />
  );
};

export default MySecondaryButton;
