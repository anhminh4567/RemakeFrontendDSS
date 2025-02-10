import { CarouselImages } from "@/assets/images/carousels";

import { FiArrowRight } from "react-icons/fi";

import { Card, Carousel } from "flowbite-react";
const images: string[] = [
  CarouselImages.carouselNo1,
  CarouselImages.carouselNo2,
  CarouselImages.carouselNo3,
];
const CarouselFlowbyte = () => {
  return (
    <div className="h-96 rounded-none relative">
      <Carousel
        className="rounded-none"
        slide={true}
        slideInterval={40000}
        leftControl="<"
        rightControl=">"
        indicators={false}
      >
        <div className="relative w-full flex justify-center items-center">
          {/* <div
            className={` opacity-30 absolute inset-0 -z-10 bg-cover bg-center justify-center items-center bg-[url(${images[0]})] scale-150 blur-md  `}
          ></div> */}
          <img
            className="object-contain z-50"
            src={images[0]}
            //src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            className="object-contain"
            //src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            src={images[1]}
            alt="..."
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            className="object-contain"
            //src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            src={images[2]}
            alt="..."
          />
        </div>
      </Carousel>
      <div className="pointer-events-none absolute  flex justify-end  top-0 left-0carousel-data w-full h-full ">
        <div className="w-[50%]  flex-none flex flex-row justify-center items-center h-full end-0">
          <div className="mymodal flex-none h-[50%] ">
            <Card className="max-w-sm bg-transparent shadow-none border-none">
              <h5 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white text-md">
                Chúc mừng cửa hàng khai trương
              </h5>
              <p className="font-light text-main-gray text-sm">
                Khám phá những món trang sức và kim cương phù hợp dành riêng cho
                bạn
              </p>
              <div className="flex flex-row gap-2 justify-center items-center">
                <button className="bg-main-gold w-auto ps-3 pe-3 h-9 rounded-lg text-small font-light text-white  inline-flex justify-center items-center">
                  mua kim cuong
                  <FiArrowRight className="ms-2" />
                </button>
                <button className="bg-main-gold w-auto h-9 ps-3 pe-3 rounded-lg text-small font-light text-white inline-flex justify-center items-center">
                  mua trang suc
                  <FiArrowRight className="ms-2" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselFlowbyte;
