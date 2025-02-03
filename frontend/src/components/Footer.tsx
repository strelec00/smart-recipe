const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-10 h-[520px]">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-5 gap-5 py-[60px]">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl font-bold">
            <img src="../src/assets/icons/chef.png" alt="" />
          </div>
        </div>

        {/* Learn More */}
        <div>
          <h3 className="text-[18px] mb-3">Learn More</h3>
          <ul className="space-y-2 text-[14px] font-thin">
            <li>
              <a href="#" className="hover:underline">
                About Lift
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press Releases
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Environment
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Tickets & Booking */}
        <div>
          <h3 className="text-lg mb-3 text-[18px]">Tickets & Booking</h3>
          <ul className="space-y-2 text-[14px] font-thin">
            <li>
              <a href="#" className="hover:underline">
                Lift Tickets
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Season Passes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vacation Packages
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center text-[14px]">
          <h3 className="text-[18px] mb-3">Contact Us</h3>
          <ul className="space-y-2 text-[14px] font-thin">
            <li>
              <a href="#" className="hover:underline">
                Lift Tickets
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Season Passes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vacation Packages
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Copyright */}
        <ul className="text-center text-[14px]">
          <h3 className="text-[18px] mb-3">Socials</h3>
          <div className="flex justify-center space-x-7 mb-4">
            <li>
              <a href="#">
                {" "}
                <img src="../src/assets/icons/fb.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../src/assets/icons/ig.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../src/assets/icons/x.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../src/assets/icons/yt.png" alt="" />
              </a>
            </li>
          </div>
        </ul>
      </div>
      <hr className="w-3/4 mx-auto border-t-1 border-gray-300 opacity-50 mt-4" />
      <div className="text-center mt-4 text-[14px] font-thin">
        <p>© 2025 Smart recipe | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
