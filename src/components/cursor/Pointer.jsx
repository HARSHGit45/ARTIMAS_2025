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
      const colors = ["#E6C999", "#D4AF75", "#E6C7A3", "#DBB583", "#D6B56A", "#E0C66D"];
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
        className="fixed pointer-events-none z-[9999] w-28 h-26"
        style={{
          left: cursorPosition.x + 47 ,
          top: cursorPosition.y + 56,
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))",
        }}
      />

    </>
  );
};

export default Pointer;