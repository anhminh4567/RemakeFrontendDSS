import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export default interface IToastParam {
  message: string;
  icon?: IconType;
  hasTimerBar?: boolean;
  autoCloseTimer?: number;
}
