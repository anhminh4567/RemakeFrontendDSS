import { HTMLAttributes } from "react";
export interface MyBadgeProps extends HTMLAttributes<HTMLDivElement> {
  Content: string | React.ReactElement;
  Size: "sm" | "md" | "lg";
}
const MyBadge = (params: MyBadgeProps) => {
  const { Content, Size, className, ...remain } = params;
  let sizePadding = "";
  if (Size == "md") sizePadding = "p-3";
  else if (Size == "sm") sizePadding = "p-2";
  else sizePadding = "p-4";
  return (
    <>
      <div
        className={`badge bg-main-gold text-white ${sizePadding} rounded-md gap-3 ${className}`}
        {...remain}
      >
        {Content}
      </div>
    </>
  );
};

export default MyBadge;
