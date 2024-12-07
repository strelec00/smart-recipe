import video from "../assets/chef_animated.gif";

const Header = () => {
  return (
    <div className="pl-[15%] pr-[15%] p-4 pt-10">
      <img
        src={video}
        alt="Chef Animation"
        className="w-[600px] shadow-2xl rounded-lg"
      />
    </div>
  );
};

export default Header;
