import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing hamburger and close icons
import Logo from '../Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-3 sm:p-5 font-bold text-lg bg-black/50 backdrop-blur-md z-50">
      
      <Logo />

      
      <div className="sm:hidden text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      
      <nav className={`sm:flex gap-4 sm:gap-10 absolute sm:static top-full left-0 w-full sm:w-auto bg-black/90 sm:bg-transparent flex-col sm:flex-row text-center ${isOpen ? 'flex' : 'hidden'}`}>
        <Link to="/hackmatrix" className="event text-white text-sm sm:text-lg p-3 sm:p-0 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">Hack Matrix</Link>
        <Link to="/datathon" className="event text-white text-sm sm:text-lg p-3 sm:p-0 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">Datathon</Link>
        <Link to="/amongus" className="event text-white text-sm sm:text-lg p-3 sm:p-0 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">Among US</Link>
        <Link to="/houdini" className="event text-white text-sm sm:text-lg p-3 sm:p-0 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">Houdini Heist</Link>
        <Link to="/pixel" className="event text-white text-sm sm:text-lg p-3 sm:p-0 hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,128,64)]">Pixel Perfect</Link>
      </nav>
    </header>
  );
};

export default Header;
