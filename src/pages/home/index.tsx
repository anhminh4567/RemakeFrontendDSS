import Blogs from "./components/Blogs";
import Carousel from "./components/Carousel";
import DiamondSelection from "./components/DiamondSelection";

const Home = () => {
  return (
    <div className=" h-auto">
      <div className="relative">
        <Carousel />
      </div>
      <div>
        <DiamondSelection />
      </div>
      <div>
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
