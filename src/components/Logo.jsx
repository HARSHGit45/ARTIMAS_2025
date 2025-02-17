import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ARTIMAS.png";

const Logo = () => {
  return (
    <Link to="/" className="relative flex items-center">
      
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 blur-lg opacity-50 animate-pulse"></div>

      <img
        src={logo}
        alt="Logo"
        className="relative z-10 h-12 w-44 sm:h-14 ml-4 brightness-130 drop-shadow-[0_0_20px_rgba(173,216,230,0.8)]"
        
      />

      
      <div className="absolute top-[-10px] left-1/2 animate-sparkle1 text-lg text-yellow-300">✨</div>
      <div className="absolute bottom-0 left-[10%] animate-sparkle2 text-xl text-blue-300">✨</div>
      <div className="absolute top-[10px] right-[-5px] animate-sparkle3 text-lg text-purple-400">✨</div>

      
      <style>
        {`
          @keyframes sparkle1 {
            0% { opacity: 0; transform: scale(0.8) translateY(0px); }
            50% { opacity: 1; transform: scale(1) translateY(-5px); }
            100% { opacity: 0; transform: scale(1.2) translateY(5px); }
          }

          @keyframes sparkle2 {
            0% { opacity: 0; transform: scale(0.9) translateX(0px); }
            50% { opacity: 1; transform: scale(1.1) translateX(5px); }
            100% { opacity: 0; transform: scale(1.2) translateX(-5px); }
          }

          @keyframes sparkle3 {
            0% { opacity: 0; transform: scale(1) translateY(0px); }
            50% { opacity: 1; transform: scale(1.2) translateY(5px); }
            100% { opacity: 0; transform: scale(1.1) translateY(-5px); }
          }

          .animate-sparkle1 { animation: sparkle1 1.5s infinite ease-in-out; }
          .animate-sparkle2 { animation: sparkle2 1.8s infinite ease-in-out; }
          .animate-sparkle3 { animation: sparkle3 2s infinite ease-in-out; }
        `}
      </style>
    </Link>
  );
};

export default Logo;
