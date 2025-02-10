import React from "react";
import ShopIcon from "@/assets/icons/ShopIcon.png";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";
import { IoIosMailUnread, IoMdPhonePortrait } from "react-icons/io";
import { IoLocation, IoMailUnread } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="flex flex-row justify-around pt-5 p-5 m-5">
      <div className="flex-1 text-small ">
        <div className="flex-1 flex-wrap ">
          <img src={ShopIcon} className="w-20 h-20 object-contain" />
        </div>
        <p className="whitespace-normal text-wrap">
          Nơi Mỗi Viên Kim Cương Kể Câu Chuyện – Thắp Sáng Thế Giới Của Bạn Với
          Sự Tinh Tế Vĩnh Cửu Từ Cửa Hàng Kim Cương
        </p>
        <div className="flex flex-col gap-2 ">
          <div className="inline-flex items-center  gap-2">
            <IoMailUnread className="" />
            diamondshopsystem@gmail.com
          </div>
          <div className="inline-flex items-start gap-1">
            <div className="h-full">
              <IoLocation className=" shrink-0 top-0 mt-1" />
            </div>
            <span>
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ
              Chí Minh 700000
            </span>
          </div>
          <div className="inline-flex items-center gap-1">
            <FaPhone className="" />
            0764750393
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col gap-2">
        <h6>Giới Thiệu Về Cửa Hàng</h6>
        <div className="flex flex-col gap-2 text-small">
          <p>Giao Hàng An Toàn</p>
          <p>Hộp Và Thiệp Miễn Phí</p>
          <p>Bảo Hành Trang Sức</p>
          <p>Bảo Hành Kim Cương</p>
        </div>
      </div>
      <div className="flex-1 flex-col gap-2">
        <h6>Chính Sách Liên Quan</h6>
        <div className="flex flex-col gap-2 text-small">
          <p>Chính Sách Giao Hàng</p>
          <p>Chính Sách Thanh Toán</p>
          <p>Chính Sách Bảo Hành</p>
          <p>Chính Sách Thành Viên</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h6>Liên Hệ Với Chúng Tôi</h6>
        <div className="inline-flex gap-3">
          <FaFacebook />
          <FaInstagram className="scale-110" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
