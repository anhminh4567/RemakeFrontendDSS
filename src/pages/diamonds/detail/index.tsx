import { GetDiamond } from "@/services/diamonds/get";
import { Diamond } from "@/types/diamonds/Diamond";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Media } from "@/types/Media";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Gallery } from "@/types/Gallery";
import { GetDiamondMedia } from "@/services/diamonds/getMedias";
import { CartItem } from "@/types/cart/CartItem";
import { WarrantyType } from "@/types/warranty/WarrantyType";
import { ToastFunction } from "@/components/toaster/myToast";
import useCartService from "@/hooks/useCartService";
import Left from "./components/left";
import Right from "./components/right";
import { Warranty } from "@/types/warranty/Warranty";
import { warrantyService } from "@/services/warranty";

const DiamondDetail = () => {
  const { diamondId } = useParams();
  const [diamond, setDiamond] = useState<Diamond | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [warrantyList, setWarrantyList] = useState<Warranty[]>([]);
  const { add } = useCartService();
  const getData = async () => {
    let [diamondResponse, galleryResponse, warrantyListResponse] =
      await Promise.all([
        GetDiamond(diamondId),
        GetDiamondMedia(diamondId),
        warrantyService.getAll(),
      ]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(!isLoading);
    if (diamondResponse.isSuccess) {
      setDiamond(diamondResponse.data);
    }
    if (galleryResponse.isSuccess) {
      setGallery(galleryResponse.data as Gallery);
    }
    if (warrantyListResponse.isSuccess) {
      setWarrantyList(
        warrantyListResponse.data.Values.filter(
          (warranty) => warranty.Type === WarrantyType.Diamond
        )
      );
      console.log(warrantyListResponse.data);
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
  const handleAddToCart = (diamond: Diamond, warranty: Warranty) => {
    let diamondItem = CartItem.CreateDiamondItem(
      diamond.Id,
      warranty.Type,
      warranty.Code,
      diamond,
      gallery.Thumbnail?.MediaPath
    );
    diamondItem.setWarranty(warranty);
    try {
      let isAddOk = add(diamondItem);
      if (isAddOk) ToastFunction.success({ message: "Thêm thành công" });
      else throw new Error();
    } catch (err) {
      console.log(err);
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
          <Left diamond={diamond} mediaList={mediaList} />
        </div>
        <div className="detail  w-[40%] detail-container p-3 mb-4">
          <Right
            diamond={diamond}
            warrantyList={warrantyList}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    );
  }
};
export default DiamondDetail;
