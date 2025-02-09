import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-center items-center p-3 sm:p-5 font-bold text-lg bg-transparent z-50">
      <nav className="flex gap-4 sm:gap-10">
        <Link
          to="/hackmatrix"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
        >
          Hack Matrix
        </Link>
        <Link
          to="/datathon"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
        >
          Datathon
        </Link>
        <Link
          to="/amongus"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
        >
          Among US
        </Link>
        <Link
          to="/Houdini"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
        >
          Houdini Heist
        </Link>
        <Link
          to="/"
          className="event text-white text-sm sm:text-lg transition duration-300 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]"
        >
          Pixel Perfect
        </Link>
      </nav>
    </header>
  );
};

export default Header;
