import Button from "./Button";
import logo from "../assets/logo_navbar.png";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-[rgb(255,255,255)] h-[100px] items-center p-3 pl-[15%] pr-[15%]">
      <img
        src={logo}
        className="w-auto h-3/4 object-contain"
        alt="logo navbar"
      />
      <Button className="" text="Login" />
    </div>
  );
};

export default Navbar;
