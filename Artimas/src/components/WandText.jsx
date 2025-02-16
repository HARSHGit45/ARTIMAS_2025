import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const textVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(10px)" },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1.2,
    boxShadow: "0px 0px 20px rgba(255, 255, 255, 1)",
    transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
  },
};

const WandText = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setStartAnimation(true), 500);
  }, []);

  return (
    <div className="event relative flex items-center justify-center">
      
      {/* Magic Text Animation */}
      <div className="absolute text-6xl md:text-8xl font-bold text-white flex space-x-2">
        {"ARTIMAS".split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={textVariants}
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default WandText;
