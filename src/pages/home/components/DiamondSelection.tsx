import {
  asscher,
  cushion,
  emerald,
  heart,
  marquise,
  oval,
  pear,
  princess,
  radiant,
  round,
} from "@/assets/icons/diamondShapes";

import { useRef, useState } from "react";
const DiamondSelection = () => {
  const slider = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!slider.current) return;
    const startX = e.pageX - slider.current.offsetLeft;
    const scrollLeft = slider.current.scrollLeft;
    setStartX(startX);
    setScrollLeft(scrollLeft);
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    setStartX(null);
    setScrollLeft(null);
    if (!slider.current) return;
    document.body.style.cursor = "default";
    e.cancelable;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walkX = (x - startX) * 1;
    slider.current.scrollLeft = scrollLeft - walkX;
  };

  return (
    <div className="w-full h-[300px] bg-main-gold bg-opacity-50 mt-5">
      <div className=" h-[30%] flex flex-col justify-center items-center w-full  text-main-gray font-bold ">
        <h5 className="py-px  text-center">Kham Pha Kim Cuong</h5>
      </div>
      <div
        ref={slider}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="select-none h-[70%] flex flex-col justify-center overflow-x-hidden scroll-smooth"
      >
        <div className="ms-10 me-10 w-auto h-[80%] flex flex-row justify-start gap-10">
          <div
            role="link"
            className="flex-none flex flex-col justify-between w-24 h-[80%] "
          >
            <img className="w-24 h-24" src={round} />
            <p className="text-center">Round</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={asscher} />
            <p className="text-center">Asscher</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={princess} />
            <p className="text-center">Princess</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={emerald} />
            <p className="text-center">Emerald</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={oval} />
            <p className="text-center">Oval</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={radiant} />
            <p className="text-center">Radiant</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={pear} />
            <p className="text-center">Pear</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={cushion} />
            <p className="text-center">Cushion</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={heart} />
            <p className="text-center">Heart</p>
          </div>
          <div className=" flex-none flex flex-col justify-between w-24 h-[80%] ">
            <img className="w-24 h-24" src={marquise} />
            <p className="text-center">Marquise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondSelection;
