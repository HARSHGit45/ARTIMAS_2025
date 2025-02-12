import React from "react";


import aimsa from "../../assets/Aimsa.png";
import gfg from "../../assets/gfg.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 to-black text-gray-500 py-6 px-8 flex flex-col md:flex-row items-center justify-between text-center">
      
      {/* Left Side - College Logo (Centered) */}
      <div className="flex-1 flex flex-col items-center justify-center">
      <img src={aimsa} alt="AIMSA Logo" className="h-16 ml-7" />
      </div>

      {/* Center - College Address & Contact */}
      <div className="flex-1 text-center">
     
        <p>Email: <span className="mt-5">Aimsa2022@gmail.com</span></p>
        <p>Email: <span className="">geeksforgeeks@pccoepune.org</span></p>
        <p>Phone: <span className="mt-5">+91 93221 93906</span></p>
        <p className="mt-5">Created with ❤️ by AiMSA-GFG Technical Team</p>
      </div>

      {/* Right Side - AIMSA & GFG Logos (Centered) */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center space-x-4">
       
         
          <img src={gfg} alt="GFG Logo" className="h-16" />
        </div>
      </div>

    </footer>
  );
};

export default Footer;
