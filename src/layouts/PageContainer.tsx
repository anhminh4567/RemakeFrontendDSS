import React, {
  EventHandler,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "./TopNavbar/Navbar";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import MyToast from "@/components/toaster/myToast";

const PageContainer = ({ children }: { children: ReactNode }) => {
  const topNavbarRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page-container ">
      <MyToast />
      {/* <div className="fixed w-[20%] bg-main-gray bg-opacity-45 h-[50%] z-[999] end-0 top-0"></div> */}
      {/* PageContainer */}
      <div ref={topNavbarRef} className="sticky top-0 z-50 bg-white ">
        <Navbar />
      </div>
      <div className="page-content -z-10">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageContainer;
