
import back from "../../assets/back1.png";
import huff from "../../assets/Slytherin.webp";
import { motion } from "framer-motion";

import { useState } from "react";
import AURegister from "./AURegister";

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
  },
  visible: {
    clipPath: "circle(50% at 50% 50%)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  bounce: { 
    y: [0, -5, 0],
    transition: { repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" } 
  }
};

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
};
const  Amngus= () => {
    
  const [showMyModal, setshowMyModal] = useState(false);

  return (
    <div className="hero2 flex min-h-screen items-center justify-center event">
      <img className="absolute h-[330px] w-[460px] md:h-[360px] md:w-[500px] lg:h-[320px] lg:w-[480px] 2xl:h-[300px] 2xl:w-[490px] " src={back} alt="Background" />

      <motion.img 
         initial="hidden"
         animate={["visible", "bounce"]}
         variants={imageVariants}
        className="absolute  md:h-[24vh] md:w-[24vh] h-[13vh] md:mt-20 w-[13vh] md:mb-[43vh] mb-[18vh] lg:h-[23vh] lg:w-[23vh] lg:mt-20 2xl:-mt-2" src={huff} alt="Huff" />

      <motion.div 
         initial="hidden"
         animate="visible"
         variants={containerVariants}
        className="relative flex flex-col items-center mt-[100px] md:mt-[70px] 2xl:mt-6 text-black">
        <motion.h1 
            variants={textVariants}
            className="text-2xl font-extrabold md:text-3xl md:font-extrabold 2xl:text-4xl">Among Us</motion.h1>
        <motion.p 
            variants={textVariants}
            className="text-sm font-semibold md:text-lg md:font-medium">Join us for an unforgettable experience!</motion.p>

        <motion.div 
            variants={textVariants}
            className="mt-4 flex gap-4 2xl:mt-4">
          <button 
          onClick={()=> setshowMyModal(true)}
          className="px-6 py-3 bg-[#004b23] border-2 border-[#6c757d] text-[#DAD7CD] rounded-full shadow-lg font-bold ">
            Register Now
          </button>
          <button className="px-6 py-3 bg-[#000000] border-2 border-[#946B2D] text-[#ffffff] rounded-full shadow-lg font-bold">
            Rulebook
          </button>

          <AURegister  visible={showMyModal} onClose={() => setshowMyModal(false)} />

        </motion.div>
      </motion.div>

    </div>
   
  );
};

export default Amngus;
