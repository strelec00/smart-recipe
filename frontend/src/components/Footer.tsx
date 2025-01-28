const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl font-bold">🍽️</div>
        </div>

        {/* Learn More */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Learn More</h3>
          <ul className="space-y-2">
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
          <h3 className="text-lg font-semibold mb-3">Tickets & Booking</h3>
          <ul className="space-y-2">
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
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>
            Hotel Reservation:{" "}
            <span className="font-semibold">123-456-7890</span>
          </p>
          <p>
            Ticket Office: <span className="font-semibold">123-456-7890</span>
          </p>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
        <p>© 2025 Smart Recipe | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
