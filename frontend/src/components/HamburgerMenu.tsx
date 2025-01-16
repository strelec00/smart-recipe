interface HamburgerMenuProps {
  isOpen: boolean;
}

const HamburgerMenu = ({ isOpen }: HamburgerMenuProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-1/3 h-3/4 bg-[#83746d] shadow-lg z-40 flex justify-center items-center rounded-br-[14px] transition-transform duration-300 ${
        isOpen
          ? "translate-x-0 translate-y-0"
          : "-translate-x-full -translate-y-full"
      }`}
    >
      <ul className="flex flex-col p-5 space-y-20 text-center text-white w-1/2">
        <li>
          <a
            href="#home"
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            Home
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            About
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href="#login"
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            Login
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            Contact
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
