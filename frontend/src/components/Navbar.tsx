import Button from "./button";

const Navbar = () => {
  Button;
  return (
    <div className="flex justify-between bg-stone-400 h-14 items-center p-4">
      <img src="/assets/smart_recipe_logo.png" />
      <Button className=" " text="Login" />
    </div>
  );
};

export default Navbar;
