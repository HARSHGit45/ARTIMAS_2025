"use client";
import React, { useEffect, useState } from "react";

const createFirefly = () => ({
  id: Math.random(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 5 + 5}s`,
});

const FireFliesBackground = () => {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const addFireflyPeriodically = () => {
      const newFirefly = createFirefly();
      setFireflies((currentFireflies) => [
        ...currentFireflies.slice(-49), // Keep the last 49 fireflies
        newFirefly,
      ]);
    };

    const interval = setInterval(addFireflyPeriodically, 500); // Add a new firefly every 500ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCss = () => {
      if (document.styleSheets.length === 0) {
        document.head.innerHTML += "<style></style>";
      }
    };

    const randomTranslate = (position, max) => {
      return Math.floor((Math.random() * max) - position);
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
          ${keyframePercent}% {
            opacity: 1;
          }
          ${keyframePercent - plusMinus}% {
            opacity: 0;
          }
          ${keyframePercent + plusMinus}% {
            opacity: 0;
          }
          ${keyframePercent2}% {
            opacity: 1;
          }
          ${keyframePercent2 - plusMinus}% {
            opacity: 0;
          }
          ${keyframePercent2 + plusMinus}% {
            opacity: 0;
          }
        }
      `;
    };

    const ruleFactory = (ruleName, duration, size, color, animationName, x, y) => {
      return `
        .${ruleName} {
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          color: ${color};
          text-shadow: 0 0 3px ${color};
          font-size: ${size}px;
          opacity: 0;
          animation: ${animationName} ${duration} linear infinite;
        }
      `;
    };

    const hatchFlies = (config = {}) => {
      const flyNodes = [];
      const flies = config.number_flies || 100; // Increase the number of flies to 100
      const color = config.color || '#ffb149';
      const element = config.elem || 'body';
      const elementDom = document.querySelector(element);
      if (!elementDom) {
        console.error(`No elements were found that match the selector: '${element}'. Please check it and try again.`);
        return;
      }
      const clientRect = elementDom.getBoundingClientRect();
      const height = clientRect.height;
      const width = clientRect.width;
      for (let fly = 0; fly < flies; fly++) {
        const className = `a${fly}`;
        const animationName = `k${fly}`;
        flyNodes.push(`<div class=${className}>&bull;</div>`);
        const size = 1 + Math.ceil(Math.random() * 15);
        const duration = 5 + (Math.random() * 60) + "s";
        const x = Math.random() < 0.5 ? 0 : width;
        const y = Math.floor(Math.random() * height);
        try {
          document.styleSheets[0].insertRule(ruleFactory(className, duration, size, color, animationName, x, y), 0);
          document.styleSheets[0].insertRule(keyframeFactory(animationName, x, y, width, height), 0);
          console.log(`Inserted CSS rule for ${className} and ${animationName}`);
        } catch (e) {
          console.error("Failed to insert CSS rule:", e);
        }
      }

      const position = element === 'body' ? 'absolute' : 'relative';
      elementDom.innerHTML += `<div id='flies' style='position: ${position}; top: 0; left:0; overflow:hidden; width:${width}px; height:${height}px; pointer-events: none;'>${flyNodes.join('')}</div>`;
      console.log('Fireflies created:', flyNodes);
    };

    checkCss();
    hatchFlies({ elem: '.fireflies-container' });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden fireflies-container" style={{ pointerEvents: 'none' }}>
      <style>
        {`
          .bg-firefly-radial {
            background: radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,215,0,0) 70%);
          }
          @keyframes move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(200px, 200px); } /* Increase the movement distance */
          }
        `}
      </style>
      {fireflies.map((firefly) => {
        return (
          <div
            key={firefly.id}
            className="absolute rounded-full w-[10px] h-[10px] bg-firefly-radial"
            style={{
              top: firefly.top,
              left: firefly.left,
              animation: `move ${firefly.animationDuration} infinite alternate`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default FireFliesBackground;

