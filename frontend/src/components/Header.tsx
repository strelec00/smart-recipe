import { useState } from "react";
import Button from "./Button";
import Hamburger from "hamburger-react";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const par1 = "HOME";
  const par2 = "ABOUT";
  const par3 = "LOGIN";
  const par4 = "CONTACT";
  return (
    <div className="flex">
      {/* Fixed Header */}
      <div className="w-full h-[70px] pl-[25px] pt-[15px] flex justify-between items-center z-50 fixed">
        <div
          style={{ color: isOpen ? "white" : "black" }} // Conditional inline styles
        >
          <Hamburger toggled={isOpen} toggle={setOpen} size={95} />
        </div>
      </div>

      {/* Responsive Menu */}
      <HamburgerMenu
        isOpen={isOpen}
        par1={par1}
        par2={par2}
        par3={par3}
        par4={par4}
      />

      {/* Main Content & Background */}
      <div className="flex h-auto w-full">
        {/* Main Content */}
        <div className="xmd:w-1/3 w-full flex xmd:justify-normal justify-center ml-9 mt-60">
          <div className="w-full text-center">
            <p className="text-[52px] font-crimson mb-[20px] font-light">
              Be your own Chef
            </p>
            <p className="text-[22px] font-crimson px-[0px] font-light">
              Create recipes with ingredients you have at home, access our AI
              recipe maker
            </p>
            <div className="flex justify-center mt-[50px] space-x-9">
              <Button
                className="rounded-[30px] border-black border w-[148px] h-[41px]"
                text="Learn more"
              />
              <Link to="/login">
                <Button
                  className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px] text-stone-50 font-medium"
                  text="Login"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div
          className="h-screen xmd:w-2/3 p-3 xmd:bg-[url('../src/assets/bg_chef_red2.png')] bg-right-top bg-no-repeat bg-contain"
          id="home"
        ></div>
      </div>
    </div>
  );
};
export default Header;
