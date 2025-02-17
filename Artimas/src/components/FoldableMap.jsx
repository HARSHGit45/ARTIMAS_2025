import { motion } from "framer-motion";
import { EVENTS } from "../constants";

const FoldableMap = () => {
 

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -40, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        bounce: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,  // Slightly scaled down for a smooth effect
    },
    visible: {
      opacity: 1,
      scale: 1, 
      transition: { duration: 1.2, ease: "easeInOut" },
    },
    bounce: { 
    y: [0, -5, 0],
    transition: { repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" } 
  }
  };

  return (
    
     <section className="event px-56 py-32 text-center mapbg items-center justify-center" >

      {/* Team Section with Smooth Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1 , y:  0 }}
        transition={{ duration: 0.6, ease: "easeOut" }} >
        <h1 className="text-4xl text-white md:text-6xl font-medium mb-12">
          EVENTS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
          {EVENTS.map((member, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center teamid rounded-2xl shadow-lg p-6 w-[32vh] h-[39vh] md:w-[29vh] md:h-[39vh] lg:w-[250px] lg:h-auto xl:w-[280px] xl:h-auto 2xl:w-[320px] 2xl:h-auto transition transform"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={projectVariants}>
   
              <div className="">
                <motion.img
                  initial="hidden"
                  animate={["visible", "bounce"]}
                  variants={imageVariants}
                  src={member.img}
                  alt={member.name}
                  className="w-[22vh] h-[24vh] -mt-4"
                />
              </div>

              
              <h2 className=" text-xl font-bold mt-5">{member.name}</h2>
              <button 
          
          className="px-6 py-3 bg-[#ac2424] border-2 border-[#60605C] text-[#FFFFFF] text-md rounded-full shadow-lg font-bold mt-3">
            Register
          </button>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FoldableMap;
