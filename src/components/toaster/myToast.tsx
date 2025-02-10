import React from "react";
import { toast, ToastContainer } from "react-toastify";
import IToastParam from "./types/IToastParams";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { VscError } from "react-icons/vsc";
import { BiSolidErrorAlt } from "react-icons/bi";
import { info } from "console";
export interface IMyToastParam extends IToastParam {
  limit: number;
}
const defaultSetting: IToastParam = {
  autoCloseTimer: 5000,
  hasTimerBar: true,
  message: "please give a message",
};
const defaulMyToastSetting: IMyToastParam = {
  ...defaultSetting,
  limit: 3,
};

const MyToast = () => {
  return (
    <ToastContainer
      limit={defaulMyToastSetting.limit}
      icon={({ type }) => {
        switch (type) {
          case "info":
            return <BiErrorCircle className="text-blue-500" />;
          case "error":
            return <VscError className="stroke-red-500 text-red-500" />;
          case "success":
            return (
              <FaRegCheckCircle className="stroke-green-500 text-green-500" />
            );
          case "warning":
            return (
              <BiSolidErrorAlt className="stroke-yellow-500 text-yellow-500" />
            );
          default:
            return null;
        }
      }}
    />
  );
};

export default MyToast;
export const ToastFunction = {
  success: (param: IToastParam) => {
    const merged = {
      ...defaultSetting,
      ...param,
    };
    toast.success(merged.message, {
      autoClose: merged.autoCloseTimer,
      hideProgressBar: !merged.hasTimerBar,
    });
  },
  fail: (param: IToastParam) => {
    const merged = {
      ...defaultSetting,
      ...param,
    };
    toast.error(merged.message, {
      autoClose: merged.autoCloseTimer,
      hideProgressBar: !merged.hasTimerBar,
    });
  },
  info: (param: IToastParam) => {
    const merged = {
      ...defaultSetting,
      ...param,
    };
    toast.info(merged.message, {
      autoClose: merged.autoCloseTimer,
      hideProgressBar: !merged.hasTimerBar,
    });
  },
};
