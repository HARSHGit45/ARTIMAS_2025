import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import wand from "./wand.png";

const Pointer = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
    }, []);
  return (
    <>
      {/* Wand Image as Cursor */}
      <img
        src={wand}
        alt="Magic Wand"
        className="fixed pointer-events-none z-[9999] w-24 h-24"
        style={{
          left: cursorPosition.x-42,
          top: cursorPosition.y+46,
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))", // Glow effect
        }}
      />

      {/* Glowing Cursor Effect */}
      <Box
        className="fixed pointer-events-none z-[9999] bg-gray-500 brightness-50 rounded-full"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(247, 247, 247, 0.5)", 
          boxShadow: "0rem 0rem 10rem 3rem rgba(227, 227, 227, 0.35)", 
        }}
      ></Box>
    </>
  )
}

export default Pointer
