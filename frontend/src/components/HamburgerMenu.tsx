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
      className={`fixed top-0 left-0 w-[300px] h-3/4 bg-[#83746d] shadow-lg z-40 flex justify-center items-center rounded-br-[14px] transition-transform duration-100 ${
        isOpen
          ? "translate-x-0 translate-y-0"
          : "-translate-x-full -translate-y-full"
      }`}
    >
      <ul className="flex flex-col p-5 space-y-20 text-center text-white w-3/5">
        <li>
          <a
            href={`#${par1.toLocaleLowerCase()}`}
            className="group hover:text-[#EE4C0C] hover:font-bold text-[24px] font-serif"
          >
            {par1}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par2.toLocaleLowerCase()}`}
            className="group hover:text-[#EE4C0C] hover:font-bold text-[24px] font-serif"
          >
            {par2}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par3.toLocaleLowerCase()}`}
            className="group hover:text-[#EE4C0C] hover:font-bold text-[24px] font-serif"
          >
            {par3}
            <hr className="border-white group-hover:border-[#EE4C0C]" />
          </a>
        </li>
        <li>
          <a
            href={`#${par4.toLocaleLowerCase()}`}
            className="group hover:text-[#EE4C0C] hover:font-bold text-[24px] font-serif"
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
