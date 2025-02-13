import React from "react";


import aimsa from "../../assets/Aimsa.png";
import gfg from "../../assets/gfg.png";
import { GrGithub } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-gradient-to-r from-gray-800 to-black  py-6 px-8 flex flex-col md:flex-row items-center justify-between text-center">
      
      {/* Left Side - College Logo (Centered) */}
      <div className=" event flex-1 flex flex-col items-center justify-center">
      <img src={aimsa} alt="AIMSA Logo" className="h-16 ml-7" />
      </div>

      {/* Center - College Address & Contact */}
      <div className=" event flex flex-col text-center">
     
        
       
        <p className="mt-5">Created with ❤️ by AiMSA-GFG Technical Team</p>
      
      <div className="flex gap-3 mt-3 justify-center items-center">
      <p><IoLogoLinkedin className="h-8 w-8" /></p>

        <p ><GrGithub className="h-8 w-8" /></p>

        <p ><FaInstagram className="h-8 w-8" /></p>
       

        </div>
      </div>

      {/* Right Side - AIMSA & GFG Logos (Centered) */}
      <div className=" event flex-1 flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center space-x-4">
       
         
          <img src={gfg} alt="GFG Logo" className="h-16" />
        </div>
      </div>

    </footer>
  );
};

export default Footer;
