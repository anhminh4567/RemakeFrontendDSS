import ShopIcons from "@/assets/icons/ShopIcon.png";
import UserIcons from "@/assets/icons/avatarbase.jpg";
import { FiChevronDown, FiShoppingCart, FiBell } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import MyButton from "@/components/ui/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <>
      <div className="relative topbar w-[100%] text-black shadow-lg h-[--navbar-height]">
        <nav className="navbar bg-white p-1 justify-between">
          <div className="flex-none">
            <a className="">
              <div className="w-10 ml-2 hover:cursor-pointer">
                <Link to="/">
                  <img src={ShopIcons} />
                </Link>
              </div>
            </a>
          </div>

          <div className=" w-full md:block md:w-auto flex-[0.9]">
            <ul className="w-full leading-5 whitespace-nowrap flex flex-row flex-wrap justify-around">
              <Link
                className="group inline-flex hover:cursor-pointer flex-row justify-center items-center text-small"
                to="/diamond"
              >
                diamond
                <FiChevronDown className="" />
                <div className="absolute w-screen left-0 top-[20%] pt-10 hidden group-hover:block hover:block">
                  <MegaMenu />
                </div>
              </Link>
              <li className="inline-flex hover:cursor-pointer flex-row justify-center items-center text-small">
                about
                <FiChevronDown />
              </li>
              <li>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input h-auto w-24 border rounded-md  border-main-gray border-opacity-45 md:w-auto"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-none gap-2 ">
            {!user ? (
              <div className="flex flex-row justify-between items-center gap-1">
                <MyButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  Content={"login"}
                  className="flex-1 w-20"
                />
                <MyButton
                  Content="Sign Up"
                  className="flex-1 text-nowrap w-20 "
                />
              </div>
            ) : (
              <>
                <div>
                  <FiShoppingCart className="m-1" />
                </div>
                <div className="relative">
                  <FiBell className="m-1" />
                  <div className="rounded-full flex items-center justify-center text-white text-[0.6rem]  bg-red-700 absolute w-[12px] h-[12px] top-0 -right-[3px]">
                    6
                  </div>
                </div>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={UserIcons}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li className="z-10 relative">
                      <a className=" justify-between ">Profile</a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
