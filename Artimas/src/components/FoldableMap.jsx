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
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
    bounce: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <section className="event px-10 md:px-20 lg:px-32 xl:px-48 2xl:px-56 py-32 text-center mapbg items-center justify-center">
      {/* Team Section with Smooth Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl text-white md:text-6xl font-medium mb-18">EVENTS</h1>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 md:gap-12 lg:gap-24 2xl:gap-16 space-x-8">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center justify-center eventcard rounded-2xl shadow-lg p-6 
                         w-[29vh] h-[39vh] md:w-[25vh] md:h-[34vh] lg:w-[307px] lg:h-[27vh] 
                         xl:w-[320px] xl:h-[30vh] 2xl:w-[420px] 2xl:h-[39vh] transition transform"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={projectVariants}
            >
              {/* Image */}
              <div>
                <motion.img
                  initial="hidden"
                  animate={["visible", "bounce"]}
                  variants={imageVariants}
                  src={event.img}
                  alt={event.name}
                  className="h-[22vh] w-[22vh] md:h-[23vh] md:w-[24vh] 2xl:h-[24vh] 2xl:w-[24vh] lg:h-[19vh] lg:w-[18vh] xl:h-[19vh] xl:w-[18vh] -mt-36 2xl:-mt-46 p-3"
                />
              </div>

              {/* Event Name */}
              <h2 className="text-4xl md:text-3xl 2xl:text-[40px] xl:text-3xl font-bold 2xl:mt-10 xl:mt-3 mt-6">{event.name}</h2>

              {/* Register Button */}
              <button
                className="px-6 py-3 2xl:px-6 2xl:py-4 border-2 border-[#60605C] text-[#FFFFFF]  text-2xl 2xl:text-2xl rounded-full shadow-lg font-bold mt-5 2xl:mt-5"
                style={{ backgroundColor: event.color }}
              >
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
