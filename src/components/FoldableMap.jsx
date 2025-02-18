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
        <h1 className="text-4xl text-white md:text-6xl font-medium mb-24">EVENTS</h1>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 place-items-center gap-10 md:gap-12 lg:gap-24 2xl:gap-36 space-x-8">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center justify-center eventcard rounded-2xl shadow-lg p-6 
                         w-[43vh] h-[55vh] md:w-[35vh] md:h-[44vh] lg:w-[270px] lg:h-[49vh] 
                         xl:w-[300px] xl:h-[50vh] 2xl:w-[420px] 2xl:h-[79vh] transition transform"
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
                  className="h-[32vh] w-[32vh] md:h-[24vh] md:w-[24vh] 2xl:h-[28vh] 2xl:w-[28vh] lg:h-[28vh] lg:w-[28vh] xl:h-[28vh] xl:w-[28vh] -mt-28 md:-mt-18 2xl:-mt-14 p-3"
                />
              </div>

              {/* Event Name */}
              <h2 className="text-2xl md:text-2xl 2xl:text-[40px] lg:text-2xl xl:text-[27px] font-bold 2xl:mt-8 xl:mt-3 mt-6">{event.name}</h2>

              {/* Register Button */}
              <button
                className="px-6 py-3 2xl:px-6 2xl:py-4 border-2 border-[#60605C] text-[#FFFFFF]  text-2xl md:text-[18px] lg:text-lg xl:text-lg 2xl:text-2xl rounded-full shadow-lg font-bold mt-5 2xl:mt-5"
                style={{ backgroundColor: event.color }}
                onClick={() => window.open(event.route, "_blank")}
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
