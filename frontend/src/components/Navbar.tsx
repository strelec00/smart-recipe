import Button from "./button";
import logo from "../assets/smart_recipe_logo3_crop.png";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-stone-400 h-[100px] items-center p-3 pl-[15%] pr-[15%]">
      <img src={logo} className="w-auto h-3/4 object-contain" />
      <Button className=" " text="Login" />
    </div>
  );
};

export default Navbar;
