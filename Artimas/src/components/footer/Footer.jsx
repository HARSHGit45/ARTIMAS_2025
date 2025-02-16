import aimsa from "../../assets/Aimsa.png";
import gfg from "../../assets/gfg.png";
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FiPhoneOutgoing } from "react-icons/fi";
import { Link } from 'react-router-dom';


// import { Link  } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-gradient-to-r from-gray-800 to-black py-6 px-8 flex flex-col items-center justify-between text-center">
      {/* AIMSA & GFG Logos Side by Side */}
      <div className="flex flex-row items-center justify-center mr-9">
        <Link to={'https://www.pccoeaimsa.in/'}>   
            <img src={aimsa} alt="AIMSA Logo" className="h-16" /> 
        </Link>
        <Link to={'https://gfgpccoe.in/'}>  
            <img src={gfg} alt="GFG Logo" className="h-16 mt-4" /> 
        </Link>
      </div>

      {/* Text and Social Icons */}
      <div className="event flex flex-col text-center">
        <p className="mt-3">Created with ❤️ by AiMSA-GFG Technical Team</p>
        <p>
        <Link to="/team" style={{ color: "#03a9f4", textDecoration: "none", fontWeight: "bold" }}>
          Meet Our Team
        </Link>
      </p>
        <p>
          <a 
            href="mailto:pccoeaimsa2022@gmail.com" 
            className="border-b border-white text-white">
            pccoeaimsa2022@gmail.com
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-2 mt-3 justify-center items-center">
          <IoLogoLinkedin className="h-9 w-9" />
          <GrGithub className="h-8 w-8" />
          <FaInstagram className="h-8 w-8" />
          <a href="tel:+919322193906"><FiPhoneOutgoing className="h-6 w-6 text-white" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
