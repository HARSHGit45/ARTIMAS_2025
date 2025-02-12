import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/ARTIMAS.png'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-3 sm:p-5 font-bold text-lg bg-black/50 backdrop-blur-md z-50">
      
      <Link to="/">
        <img src={logo} alt="Logo" className="h-8 w-40 sm:h-12 ml-4" />
      </Link>

      {/* Navigation Menu */}
      <nav className="flex gap-4 sm:gap-10">
        <Link
          to="/hackmatrix"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)] nav"
        >
          Hack Matrix
        </Link>
        <Link
          to="/datathon"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)] nav"
        >
          Datathon
        </Link>
        <Link
          to="/amongus"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)] nav"
        >
          Among US
        </Link>
        <Link
          to="/Houdini"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)] nav"
        >
          Houdini Heist
        </Link>
        <Link
          to="/pixel"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)] nav"
        >
          Pixel Perfect
        </Link>
      </nav>
    </header>
  );
};

export default Header;
