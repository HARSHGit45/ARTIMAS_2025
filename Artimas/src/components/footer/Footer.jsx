import aimsa from "../../assets/Aimsa.png";
import gfg from "../../assets/gfg.png";
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-gradient-to-r from-gray-800 to-black py-6 px-8 flex flex-col items-center justify-between text-center">
      {/* AIMSA & GFG Logos Side by Side */}
      <div className="flex flex-row items-center justify-center mr-9">
        <img src={aimsa} alt="AIMSA Logo" className="h-16" />
        <img src={gfg} alt="GFG Logo" className="h-16 mt-4" />
      </div>

      {/* Text and Social Icons */}
      <div className="event flex flex-col text-center">
        <p className="mt-3">Created with ❤️ by AiMSA-GFG Technical Team</p>

        <p>
        <a 
          href="mailto:pccoeaimsa2022@gmail.com" 
          className="text-white inline-block border-b border-white hover:border-gray-300">
          pccoeaimsa2022@gmail.com
        </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-3 mt-3 justify-center items-center">
          <IoLogoLinkedin className="h-9 w-9" />
          <GrGithub className="h-8 w-8" />
          <FaInstagram className="h-8 w-8" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
