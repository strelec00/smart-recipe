interface HamburgerMenuProps {
  isOpen: boolean;
  par1: string;
  par2: string;
  par3: string;
  par4: string;
}

const HamburgerMenu = ({
  isOpen,
  par1,
  par2,
  par3,
  par4,
}: HamburgerMenuProps) => {
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
            href={`#${par1}`}
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            {par1}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par2}`}
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            {par2}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par3}`}
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            {par3}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par4}`}
            className="group hover:text-[#EE4C0C] hover:font-bold"
          >
            {par4}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenu;
