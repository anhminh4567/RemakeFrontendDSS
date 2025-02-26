import { GetDiamond } from "@/services/diamonds/get";
import { Diamond } from "@/types/diamonds/Diamond";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Collapse, Image } from "antd";
import { Media } from "@/types/Media";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Gallery } from "@/types/Gallery";
import { GetDiamondMedia } from "@/services/diamonds/getMedias";
import MyBadge from "@/components/ui/MyBadge";
import { getEnumStringFromNumber } from "@/utils/enumUtils";
import {
  Clarity,
  Color,
  Culet,
  Cut,
  Fluorescence,
  Girdle,
  Polish,
  Symmetry,
} from "@/types/diamonds/Enums";
import { Formatter } from "@/utils/Formater";
import MyButton, { MyButtonSize } from "@/components/ui/buttons/MyButton";
import MySecondaryButton from "@/components/ui/buttons/MySecondaryButton";
import { IoIosInformationCircle } from "react-icons/io";
import { CartItem } from "@/types/cart/CartItem";
import { WarrantyType } from "@/types/WarrantyType";
import { cartService } from "@/services/carts";
import { ToastFunction } from "@/components/toaster/myToast";

const DiamondDetail = () => {
  const { diamondId } = useParams();
  const [diamond, setDiamond] = useState<Diamond | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const getData = async () => {
    let [diamondResponse, galleryResponse] = await Promise.all([
      GetDiamond(diamondId),
      GetDiamondMedia(diamondId),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(!isLoading);
    if (diamondResponse.isSuccess) {
      setDiamond(diamondResponse.data);
    }
    if (galleryResponse.isSuccess) {
      setGallery(galleryResponse.data as Gallery);
    }
  };
  const mapAllImageToMediaLocal = (gallery: Gallery): Media[] => {
    let result = [];
    Object.entries(gallery["Gallery"]).forEach((tuple) => {
      let [_, values] = tuple;
      result = [...result, values];
    });
    if (gallery.Thumbnail) {
      result = [...result, gallery.Thumbnail];
    }
    return result;
  };
  const handleAddToCart = () => {
    let diamondItem = CartItem.CreateDiamondItem(
      diamond.Id,
      WarrantyType.Diamond,
      "nonthing"
    );
    try {
      cartService.add(diamondItem);
      ToastFunction.success({ message: "Thêm thành công" });
    } catch (err) {
      ToastFunction.fail({ message: "Thêm Thất Bại" });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (gallery) {
      let mappedList = mapAllImageToMediaLocal(gallery);
      setMediaList(mappedList);
    }
  }, [gallery]);
  if (!isLoading && !diamond)
    return (
      <div className="text-red-500 font-bold text-lg  h-[500px] flex justify-center items-center m-6 shadow-lg">
        not found diamond
      </div>
    );
  else if (isLoading && !diamond)
    return <LoadingSpinner className="w-full h-[400px]" />;
  else {
    return (
      <div className="m-5 shadow-lg h-full w-[80%] mx-auto flex justify-between gap-2">
        <div className="media  w-[60%]">
          <ImageDisplay images={mediaList} />
          <div className="w-full h-fit m-3 p-4">
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Giấy chứng nhận</p>
              <a href="#" className=" hover:underline">
                View Report
              </a>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Mã Định Danh</p>
              <p>{diamond.SerialCode}</p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Hình dạng</p>
              <p>{diamond.DiamondShape.ShapeName}</p>
            </div>
            <hr className="my-2" />
            {diamond.Cut && (
              <>
                <div className="cert flex flex-row justify-between  font-light text-sm ">
                  <p className="">Chất lượng cắt (Cut)</p>
                  <p className="inline-flex items-center gap-1">
                    {getEnumStringFromNumber(diamond.Cut, Cut)}
                    <IoIosInformationCircle className="w-full h-full" />
                  </p>
                </div>
                <hr className="my-2" />
              </>
            )}
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Màu sắc (Color)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Color, Color)}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Độ trong suốt (Clarity)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Clarity, Clarity)}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Carat</p>
              <p>{diamond.Carat}.ct</p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Huỳnh quang (Fluorescence)</p>
              <p>
                {getEnumStringFromNumber(diamond.Fluorescence, Fluorescence)}
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Độ sâu (Depth) %</p>
              <p>{diamond.Depth}</p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Bảng đáy (Table) %</p>
              <p>{diamond.Table}</p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Độ bóng (Polish)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Polish, Polish)}{" "}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Độ đối xứng (Symmetry)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Symmetry, Symmetry)}{" "}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Viền cạnh (Girdle)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Girdle, Girdle)}{" "}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
            <div className="cert flex flex-row justify-between  font-light text-sm ">
              <p className="">Chóp đáy (Culet)</p>
              <p className="inline-flex items-center gap-1">
                {getEnumStringFromNumber(diamond.Culet, Culet)}{" "}
                <IoIosInformationCircle className="w-full h-full" />
              </p>
            </div>
            <hr className="my-2" />
          </div>
        </div>
        <div className="detail  w-[40%] detail-container p-3 mb-4">
          <div className="detail-title">
            <h5 className="w-[80%] text-lg font-thin">{diamond.Title}</h5>
            <div className="4C-badge w-full h-full flex gap-2 mt-4">
              <MyBadge
                Content={`${getEnumStringFromNumber(
                  diamond.Color,
                  Color
                )} color`}
                Size="sm"
                className="text-small"
              />
              <MyBadge
                Content={`${getEnumStringFromNumber(
                  diamond.Clarity,
                  Clarity
                )} clarity`}
                Size="sm"
                className="text-small"
              />
              {diamond.Cut && (
                <MyBadge
                  Content={`${getEnumStringFromNumber(diamond.Cut, Cut)} cut`}
                  Size="sm"
                  className="text-small"
                />
              )}
              <MyBadge
                Content={`${diamond.Carat}ct`}
                Size="sm"
                className="text-small"
              />
            </div>

            {/* conditionally render the price if sale or not
             */}
            {diamond.SalePrice != diamond.TruePrice ? (
              <div className="my-4">
                <p className="text-small font-light cross line-through">
                  {Formatter.FormatMoneyCommaVND(diamond.SalePrice)}.đ
                </p>
                <p className="">
                  {Formatter.FormatMoneyCommaVND(diamond.TruePrice)}.đ
                </p>
              </div>
            ) : (
              <p className="my-4">
                {Formatter.FormatMoneyCommaVND(diamond.TruePrice)}.đ
              </p>
            )}
          </div>
          <hr className="w-full h-[1px] my-5" />
          <div className="button-add-details">
            <MyButton
              onClick={() => {
                handleAddToCart();
              }}
              Size={MyButtonSize.MD}
              Content={"Thêm vào giỏ hàng"}
              className="text-center text-nowrap text-md font-bold w-full rounded-sm text-black"
            />
            <MySecondaryButton
              Size={MyButtonSize.MD}
              Content={"Contact Expert"}
              className="w-full rounded-sm"
            />
          </div>
          <hr className="w-full h-[1px] my-5" />
          <div className="extra-product-detail">
            <Collapse
              className="bg-transparent font-bold"
              items={[
                {
                  key: 0,
                  label: "Chi tiết sản phẩm",
                  children: (
                    <p className="font-light">
                      Viên kim cương ${diamond.DiamondShape.ShapeName} $
                      {diamond.Carat}.ct này chỉ được bán tại Cửa hàng Kim
                      cương.
                    </p>
                  ),
                },
              ]}
              bordered={false}
            />
            <Collapse
              className="bg-transparent font-bold"
              items={[
                {
                  key: 1,
                  label: "Báo cáo phân loại GIA",
                  children: (
                    <p className="font-light">
                      Đây là báo cáo ghi nhận các đặc điểm cụ thể của viên kim
                      cương, do GIA cấp, một trong những tổ chức được kính trọng
                      nhất trong ngành kim cương.
                    </p>
                  ),
                },
              ]}
              bordered={false}
            />
          </div>
        </div>
      </div>
    );
  }
};
interface ImageDisplayProps {
  images: Media[];
}
export function ImageDisplay(params: ImageDisplayProps): React.ReactNode {
  const [currentImage, setCurrentImage] = useState<Media>(() => {
    if (params.images && params.images.length > 0) {
      return params.images[0];
    } else return null;
  });
  const [mediaList] = useState<Media[]>(params.images);
  const handleSelectImage = (e: React.MouseEvent<HTMLElement>, src: string) => {
    console.log(src);
    console.log(e.currentTarget.id);
    setCurrentImage(params.images.filter((x) => x.MediaPath == src).pop());
  };
  return (
    <div className="w-full ">
      <div className="flex justify-center">
        <Image
          preview={true}
          className="min-w-[200px] min-h-[200px] max-w-[300px] max-h-[300px]"
          src={currentImage?.MediaPath}
          fallback="data:image/png;base64,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"
        />
      </div>

      <div className="w-full px-5">
        <div
          className="child overflow-x-auto my-2 pb-1  w-full flex flex-nowrap space-x-2 gap-2 
            [&::-webkit-scrollbar]:h-[5px] 
            [&::-webkit-scrollbar-track]:bg-gray-400
            [&::-webkit-scrollbar-thumb]:bg-main-gold"
        >
          {mediaList.map((media) => {
            console.log(currentImage);
            console.log(media);
            if (currentImage && currentImage.MediaPath != media.MediaPath)
              return (
                <>
                  <Image
                    preview={false}
                    id={media.MediaPath}
                    onClick={(e) => handleSelectImage(e, e.currentTarget.id)}
                    className="max-w-28 min-w-20 shrink-0"
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                </>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default DiamondDetail;
