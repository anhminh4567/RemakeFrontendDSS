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
import { InlineImageText } from "@/components/ui/InlineImageText";
const MegaMenu = () => {
  return (
    <>
      <div className="flex flex-row justify-around shadow-md w-full pb-8 bg-white">
        <div className=" flex flex-col  m-1">
          <div className="flex flex-col justify-start">
            <h6 className="">
              <a href="*">kim cuong</a>
            </h6>
            <div className="flex flex-row">
              <div className="flex-1 flex flex-col gap-1">
                <InlineImageText imagePath={round} text="Round" />
                <InlineImageText imagePath={asscher} text="Asscher" />
                <InlineImageText imagePath={marquise} text="Marquise" />
                <InlineImageText imagePath={oval} text="Oval" />
                <InlineImageText imagePath={pear} text="Pear" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <InlineImageText imagePath={cushion} text="Cushion" />
                <InlineImageText imagePath={princess} text="Princess" />
                <InlineImageText imagePath={radiant} text="Radiant" />
                <InlineImageText imagePath={emerald} text="Emerald" />
                <InlineImageText imagePath={heart} text="Heart" />
              </div>
            </div>
          </div>
          <div>
            <h6>Loai Kim Cuong</h6>
            <div className="flex flex-col gap-1 ps-1">
              <a>Natural</a>
              <a>Lab grown</a>
            </div>
          </div>
        </div>
        <div className="  m-1">
          <div className="top">
            <h6>Bang Gia</h6>
            <div className="flex flex-col gap-1 ps-1">
              <a> Kim Cuong Tu Nhien</a>
              <a> Kim Cuong Nhan Tao</a>
              <a> Kim Cuong Tam</a>
            </div>
          </div>
        </div>
        <div className="  m-1">
          <div className="top">
            <h6>Kien Thu Kim Cuong</h6>
            <div className="flex flex-col gap-1 ps-1 text-wrap">
              <a> Nguon Goc kim Cuong</a>
              <a>Tieu Chi 4C</a>
              <a>Cac Loai Mat Cat</a>
              <a>Carat, Khoi Luong Va Chat Luong</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
