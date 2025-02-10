export interface InlineImageTextProps {
  text: string;
  imagePath: string;
  hoverEffect?: boolean;
  textClass?: string;
  imageClass?: string;
}
const defaultProps: InlineImageTextProps = {
  imagePath: "",
  text: "",
  hoverEffect: false,
};
//underline-animation
export const InlineImageText = (params: InlineImageTextProps) => {
  const merggedProps: InlineImageTextProps = {
    ...defaultProps,
    ...params,
  };
  console.log(merggedProps);
  return (
    <>
      <div
        className={`inline-flex justify-start align-middle gap-1 pb-1 text-center ${
          merggedProps.hoverEffect ? "underline-animation" : ""
        } `}
      >
        <div className={`w-6 h-6 object-contain`}>
          <img
            src={params.imagePath}
            className={`w-full h-full object-contain  ${
              merggedProps.imageClass == null ? "" : merggedProps.imageClass
            } `}
          />
        </div>

        <p
          className={`flex-1 text-start  ${
            merggedProps.textClass == null ? "" : merggedProps.textClass
          } `}
        >
          {params.text}
        </p>
      </div>
    </>
  );
};
