import { useState } from "react";
import { RiMenu3Line, RiCloseFill } from "react-icons/ri";
import Logo from "./Logo"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto md:my-2 bg-stone-950 px-12 py-[12px] md:rounded-xl backdrop-blur-lg">
        <div>
          <Logo />
        </div>

        <div className="hidden md:flex space-x-8 text-[21px] font-bold event">
            <Link to="/events"
              className="text-white transition duration-300 hover:text-orange-600 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">
              Events
            </Link>
            <Link to="/calander"
              className="text-white transition duration-300 hover:text-orange-600 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">
              Calendar
            </Link>
            <Link to="/sponsor"
              className="text-white transition duration-300 hover:text-orange-600 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">
              Sponsor
            </Link>
           
          
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <RiCloseFill className="w-6 h-6" />
            ) : (
              <RiMenu3Line className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden py-4 bg-stone-950 backdrop-blur-lg flex flex-col space-y-4 max-w-6xl items-center justify-center text-2xl event font-bold mx-auto">
            <Link to="/events"
              className="text-white transition duration-300 hover:text-orange-600 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
              onClick={handleLinkClick}
            >
              Events
            </Link>
            <Link to="/calander"
              className="text-white hover:text-stone-400 transition duration-300"
              onClick={handleLinkClick}
            >
              Calendar
            </Link>
            <Link to="/sponsor"
              className="text-white hover:text-stone-400 transition duration-300"
              onClick={handleLinkClick}
            >
              Sponsor
            </Link>
           
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;