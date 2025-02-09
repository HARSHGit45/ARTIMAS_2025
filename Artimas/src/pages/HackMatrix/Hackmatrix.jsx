
import back from "../../assets/back1.png";
import huff from "../../assets/Ravenclaw.webp";
import { motion } from "framer-motion";



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
const  Hackmatrix = () => {
    
 

  return (
    <div className="hero3 flex min-h-screen items-center justify-center event">
      <img className="absolute h-[330px] w-[460px] md:h-[360px] md:w-[500px]" src={back} alt="Background" />

      <motion.img 
         initial="hidden"
         animate={["visible", "bounce"]}
         variants={imageVariants}
        className="absolute md:h-[28vh] md:w-[28vh] h-[13vh] w-[13vh] md:mb-[43vh] mb-[18vh]" src={huff} alt="Huff" />

      <motion.div 
         initial="hidden"
         animate="visible"
         variants={containerVariants}
        className="relative flex flex-col items-center mt-[100px] md:mt-[70px] text-black">
        <motion.h1 
            variants={textVariants}
            className="text-2xl font-extrabold md:text-3xl md:font-extrabold">Hackmatrix</motion.h1>
        <motion.p 
            variants={textVariants}
            className="text-sm font-semibold md:text-lg md:font-medium">Join us for an unforgettable experience!</motion.p>

        <motion.div 
            variants={textVariants}
            className="mt-4 flex gap-4">
          <button 
          
          className="px-6 py-3 bg-[#FFB900] border-2 border-[#60605C] text-[#000000] rounded-full shadow-lg">
            Register Now
          </button>
          <button className="px-6 py-3 bg-[#0E1A40] border-2 border-[#946B2D] text-[#D4A017] rounded-full shadow-lg">
            Rulebook
          </button>

         

        </motion.div>
      </motion.div>

    </div>
   
  );
};

export default Hackmatrix;
