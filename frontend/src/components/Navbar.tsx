import image from "../assets/hamburger_menu_icon.png";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="flex flex-col justify-between h-[832px] w-full sm:w-auto p-3 bg-[url('../src/assets/bg_chef_red.png')] bg-right-top bg-no-repeat bg-contain">
      {/* First div (fixed height) */}
      <div className="w-full h-[70px] ml-[10px]">
        <img src={image} className="w-[60px] h-[62px]" />
      </div>

      {/* Second div (takes remaining height) */}
      <div className="w-full flex-1 mt-[170px] flex">
        <div className="w-1/2 text-center">
          <p className="text-[52px] font-crimson mb-[20px] font-light">
            Be your own Chef
          </p>
          <p className="text-[22px] font-crimson pr-[100px] pl-[100px] font-light">
            Create recipes with ingredients you have at home, access our AI
            recipe maker
          </p>
          <div className="flex justify-center mt-[50px] space-x-9">
            <Button
              className="rounded-[30px] border-black border w-[148px] h-[41px]"
              text="Learn more"
            />
            <Button
              className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px]"
              text="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
