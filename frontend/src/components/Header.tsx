import video from "../assets/chef_animated.gif";

const Header = () => {
  return (
    <div className="pl-[15%] pr-[15%] p-10 flex space-x-4 bg-[#F7AE16] shadow-md rounded-sm z-[-20]">
      <div className="flex h-auto">
        <img
          src={video}
          alt="Chef Animation"
          className="shadow-2xl rounded-lg"
        />
      </div>
      <div className="flex-1 flex items-center justify-center font-inter text-[32px] font-medium">
        <p>Be your own Chef</p>
      </div>
    </div>
  );
};

export default Header;
