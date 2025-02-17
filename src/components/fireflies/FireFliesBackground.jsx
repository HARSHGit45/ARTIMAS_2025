import React, { useEffect, useState } from "react";

const createFirefly = () => ({
  id: Math.random(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 10 + 10}s`, // Slower movement
});

const FireFliesBackground = () => {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const addFireflyPeriodically = () => {
      const newFirefly = createFirefly();
      setFireflies((currentFireflies) => [
        ...currentFireflies.slice(-29), // Keep only last 29 fireflies (fewer particles)
        newFirefly,
      ]);
    };

    const interval = setInterval(addFireflyPeriodically, 1000); // Add a new firefly every 1000ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const randomTranslate = (position, max) => {
      return Math.floor(Math.random() * max - position);
    };

    const keyframeFactory = (className, x, y, width, height) => {
      const keyframePercent = Math.floor(Math.random() * 40);
      const keyframePercent2 = 50 + Math.floor(Math.random() * 40);
      const plusMinus = 3;
      return `
        @keyframes ${className} {
          50% {
            transform: translate(${x > 0 ? -width : width}px, ${randomTranslate(y, height)}px);
          }
          ${keyframePercent}% { opacity: 1; }
          ${keyframePercent - plusMinus}% { opacity: 0; }
          ${keyframePercent + plusMinus}% { opacity: 0; }
          ${keyframePercent2}% { opacity: 1; }
          ${keyframePercent2 - plusMinus}% { opacity: 0; }
          ${keyframePercent2 + plusMinus}% { opacity: 0; }
        }
      `;
    };

    const ruleFactory = (className, duration, size, color, animationName, x, y) => {
      return `
        .${className} {
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          color: ${color};
          text-shadow: 0 0 10px ${color}, 0 0 20px ${color};
          font-size: ${size}px;
          opacity: 0;
          animation: ${animationName} ${duration} linear infinite;
        }
      `;
    };

    const hatchFlies = (config = {}) => {
      const flyNodes = [];
      const flies = config.number_flies || 30; // Fewer particles
      const color = config.color || "#ffb149";
      const element = config.elem || ".fireflies-container";
      const elementDom = document.querySelector(element);

      if (!elementDom) {
        console.error(`No element found matching: '${element}'`);
        return;
      }

      const clientRect = elementDom.getBoundingClientRect();
      const height = clientRect.height;
      const width = clientRect.width;

      // Create style element
      let styleEl = document.getElementById("fireflies-style");
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "fireflies-style";
        document.head.appendChild(styleEl);
      }

      for (let fly = 0; fly < flies; fly++) {
        const className = `firefly-${fly}`;
        const animationName = `firefly-animation-${fly}`;
        flyNodes.push(`<div class="${className}">&bull;</div>`);
        
        const size = 1 + Math.ceil(Math.random() * 15);
        const duration = 10 + Math.random() * 60 + "s"; // Slower movement
        const x = Math.random() < 0.5 ? 0 : width;
        const y = Math.floor(Math.random() * height);

        try {
          styleEl.sheet.insertRule(ruleFactory(className, duration, size, color, animationName, x, y), 0);
          styleEl.sheet.insertRule(keyframeFactory(animationName, x, y, width, height), 0);
        } catch (e) {
          console.error("Failed to insert CSS rule:", e);
        }
      }

      // Ensure no duplicated fireflies container
      let fliesContainer = document.getElementById("flies");
      if (!fliesContainer) {
        fliesContainer = document.createElement("div");
        fliesContainer.id = "flies";
        fliesContainer.style.position = "absolute";
        fliesContainer.style.top = "0";
        fliesContainer.style.left = "0";
        fliesContainer.style.overflow = "hidden";
        fliesContainer.style.width = `${width}px`;
        fliesContainer.style.height = `${height}px`;
        fliesContainer.style.pointerEvents = "none";
        fliesContainer.style.border = "none";
        fliesContainer.style.outline = "none";
        elementDom.appendChild(fliesContainer);
      }

      fliesContainer.innerHTML = flyNodes.join(""); // Append all fireflies
    };

    hatchFlies({ elem: ".fireflies-container" });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden fireflies-container"
      style={{ pointerEvents: "none" }}
    >
      <style>
        {`
          .bg-firefly-radial {
            background: radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,255,0,0) 70%);
          }
          @keyframes move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(200px, 200px); } 
          }
          .fireflies-container * {
            outline: none;
            border: none;
          }
          .fireflies-container {
            border: none !important;
            outline: none !important;
          }
        `}
      </style>
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute rounded-full w-[10px] h-[10px] bg-firefly-radial"
          style={{
            top: firefly.top,
            left: firefly.left,
            animation: `move ${firefly.animationDuration} infinite alternate`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FireFliesBackground;

