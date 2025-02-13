
//(previous code)
// import React, { useState, useEffect } from "react";
// import { Box } from "@mui/material";
// import wand from "./wand.png";

// const Pointer = () => {
//     const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//     const updateCursorPosition = (e) => {
//       setCursorPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", updateCursorPosition);
//     return () => {
//       window.removeEventListener("mousemove", updateCursorPosition);
//     };
//     }, []);
//   return (
//     <>
//       {/* Wand Image as Cursor */}
//       <img
//         src={wand}
//         alt="Magic Wand"
//         className="fixed pointer-events-none z-[9999] w-24 h-24"
//         style={{
//           left: cursorPosition.x-42,
//           top: cursorPosition.y+47,
//           transform: "translate(-50%, -50%)",
//           filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))", // Glow effect
//         }}
//       />

//       {/* Glowing Cursor Effect */}
//       <Box
//         className="fixed pointer-events-none z-[9999] bg-gray-500 brightness-50 rounded-full"
//         style={{
//           left: cursorPosition.x,
//           top: cursorPosition.y,
//           width: "10px",
//           height: "10px",
//           transform: "translate(-50%, -50%)",
//           backgroundColor: "rgba(247, 247, 247, 0.5)", 
//           boxShadow: "0rem 0rem 10rem 3rem rgba(227, 227, 227, 0.35)", 
//         }}
//       ></Box>
//     </>
//   )
// }

// export default Pointer



// with particles cursor effect(code)
// import React, { useState, useEffect } from "react";
// import { Box } from "@mui/material";
// import wand from "./wand.png";

// const Pointer = () => {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateCursorPosition = (e) => {
//       setCursorPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", updateCursorPosition);
//     return () => {
//       window.removeEventListener("mousemove", updateCursorPosition);
//     };
//   }, []);

//   useEffect(() => {
//     // Set up the canvas
//     const canvas = document.getElementById('particle-canvas');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const context = canvas.getContext('2d');

//     // Set up the particle class
//     class Particle {
//       constructor(x, y, radius, color) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color;
//         this.dx = Math.random() * 1 - 0.5; // Reduced velocity
//         this.dy = Math.random() * 1 - 0.5; // Reduced velocity
//         this.lifespan = 700; // 1.5 seconds
//         this.birthdate = new Date().getTime();
//       }

//       draw() {
//         context.beginPath();
//         context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         context.fillStyle = this.color;
//         context.shadowBlur = 10;
//         context.shadowColor = "gold";
//         context.fill();
//         context.shadowBlur = 0; // Reset shadowBlur to avoid affecting other drawings
//       }

//       update() {
//         this.x += this.dx;
//         this.y += this.dy;
//         const age = new Date().getTime() - this.birthdate;
//         if (age > this.lifespan) {
//           this.radius = 0;
//         }
//       }
//     }

//     // Set maxParticles as a predefined variable
//     const maxParticles = 200;

//     // Create an array to store the particles
//     const particles = [];

//     // Flag to track whether the mouse is moving
//     let isMouseMoving = false;

//     // Function to get a random color
//     function getRandomColor() {
//       return "gold";
//     }

//     // Generate particles when the mouse is moving
//     function generateParticles(event) {
//       if (isMouseMoving && particles.length < maxParticles) {
//         const color = getRandomColor();
//         const particle = new Particle(event.x, event.y, Math.random() * 2 + 0.5, color); // Smaller radius
//         particles.push(particle);
//       }
//     }

//     // Start generating particles on mousemove events
//     window.addEventListener('mousemove', function(event) {
//       isMouseMoving = true;
//       generateParticles(event);
//     });

//     // Stop generating particles when the mouse stops moving
//     window.addEventListener('mouseout', function() {
//       isMouseMoving = false;
//     });

//     // Animate the particles
//     function animate() {
//       requestAnimationFrame(animate);
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//         if (particles[i].radius <= 0) {
//           particles.splice(i, 1);
//           i--;
//         }
//       }
//     }

//     animate();
//   }, []);

//   return (
//     <>
//       <canvas id="particle-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"></canvas>
//       {/* Wand Image as Cursor */}
//       <img
//         src={wand}
//         alt="Magic Wand"
//         className="fixed pointer-events-none z-[9999] w-24 h-24"
//         style={{
//           left: cursorPosition.x - 42,
//           top: cursorPosition.y + 47,
//           transform: "translate(-50%, -50%)",
//           filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))", // Glow effect
//         }}
//       />

//       {/* Glowing Cursor Effect */}
//       <Box
//         className="fixed pointer-events-none z-[9999] bg-gray-500 brightness-50 rounded-full"
//         style={{
//           left: cursorPosition.x,
//           top: cursorPosition.y,
//           width: "10px",
//           height: "10px",
//           transform: "translate(-50%, -50%)",
//           backgroundColor: "rgba(247, 247, 247, 0.5)",
//           boxShadow: "0rem 0rem 10rem 3rem rgba(227, 227, 227, 0.35)",
//         }}
//       ></Box>
//     </>
//   );
// };

// export default Pointer;

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

  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const context = canvas.getContext("2d");

    // Set up canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 2; // Increased movement speed
        this.dy = (Math.random() - 0.5) * 2;
        this.lifespan = 800; // Time before fading
        this.birthdate = new Date().getTime();
        this.opacity = 1; // Full opacity initially
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.globalAlpha = this.opacity;
        context.shadowBlur = 15;
        context.shadowColor = this.color;
        context.fill();
        context.globalAlpha = 1; // Reset opacity
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        const age = new Date().getTime() - this.birthdate;
        this.opacity = Math.max(1 - age / this.lifespan, 0); // Fade effect
      }
    }

    const maxParticles = 400; // Increased number of particles
    const particles = [];
    let isMouseMoving = false;

    function getRandomColor() {
      const colors = ["#ADD8E6", "#87CEFA", "#D8BFD8", "#C6A2FC", "#90EE90", "#98FB98"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateParticles(event) {
      if (isMouseMoving && particles.length < maxParticles) {
        const color = getRandomColor();
        const particle = new Particle(event.x, event.y, Math.random() * 2 + 1, color); // Slightly smaller radius
        particles.push(particle);
      }
    }

    window.addEventListener("mousemove", (event) => {
      isMouseMoving = true;
      generateParticles(event);
    });

    window.addEventListener("mouseout", () => {
      isMouseMoving = false;
    });

    function animate() {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
    }

    animate();
  }, []);

  return (
    <>
      <canvas id="particle-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"></canvas>

      {/* Wand Image as Cursor */}
      <img
        src={wand}
        alt="Magic Wand"
        className="fixed pointer-events-none z-[9999] w-24 h-24"
        style={{
          left: cursorPosition.x - 42,
          top: cursorPosition.y + 47,
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))",
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
  );
};

export default Pointer;