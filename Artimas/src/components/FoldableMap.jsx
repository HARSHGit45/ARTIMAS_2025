import { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import coordinate from "../assets/coordinate.png";
import { Link } from "react-router-dom"


const FoldableMap = () => {
  const xDrag = useMotionValue(0);
  const [isFolded, setIsFolded] = useState(true);

  const xLeftSection = useTransform(xDrag, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(xDrag, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  const centerBrightness = useTransform(xDrag, [150, 300], [0.2, 1]);

  useMotionValueEvent(xDrag, "change", (currentX) => {
    setIsFolded(currentX <= 260);
  });

  return (
    <>
    <div className=" mapbg relative min-h-screen w-full flex flex-col items-center">
      {/* Responsive Container for the Map */}
      <div className="overflow-x-clip mt-64 sm:mt-20 md:mt-96 lg:mt-64 xl:mt-20 2xl:mt-44 rotate-x-64 -rotate-y-4 rotate-z-5" style={{ perspective: "1000px" }}>
        <motion.div animate={isFolded ? "folded" : "open"} variants={{ open: { scale: 1 }, folded: { scale: 0.9 } }} initial="folded">
          {/* Responsive Map Size */}
        
        
          <motion.div className="grid aspect-video h-[28vh] sm:h-[32vh] md:h-[38vh] lg:h-[80vh] xl:h-[70vh] w-[40vh] sm:w-[50vh] md:w-[60vh] lg:w-[108vh] xl:w-[120vh] 2xl:w-[120vh] relative">
            <div className="grid grid-cols-3 [grid-area:1/1]">
              <motion.div style={{ x: xLeftSection, skewY: "-1deg" }} className="map-image border-r border-gray-200 shadow-lg" />
              <motion.div style={{ scaleX: centerScale, "--brightness": centerBrightness }} className="map-image brightness-[--brightness]" />
              <motion.div style={{ x: xRightSection, skewY: "1deg" }} className="map-image border-l border-gray-200 shadow-lg" />
            </div>

            <motion.div
              drag="x"
              _dragX={xDrag}
              dragConstraints={{ left: 0, right: 300 }}
              dragTransition={{ modifyTarget: (target) => (target > 150 ? 300 : 0), timeConstant: 45 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            />
          </motion.div>

        </motion.div>
        
      </div>


      {!isFolded && (
        <>
          <motion.div className="absolute top-72 sm:top-24 md:top-118 lg:top-80 xl:top-40 left-12 sm:left-16 md:left-22 lg:left-44 xl:left-83 2xl:top-60 2xl:left-90 rotate-x-0 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}>
            <EventCard title="HackMatrix" />
          </motion.div>
          <motion.div className="absolute top-77 sm:top-48 md:top-130 lg:top-97 xl:top-59 left-40 sm:left-44 md:left-82 lg:left-120 xl:left-149 2xl:top-79 2xl:left-169 -rotate-x-12 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.4 } }}>
            <EventCard title="Datathon" />
          </motion.div>
          <motion.div className="absolute top-86 sm:top-64 md:top-146 md:left-40 lg:top-118 lg:left-55 xl:top-76 left-20 2xl:top-98 2xl:left-100 rotate-x-0 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.6 } }}>
            <EventCard title="Among Us" />
          </motion.div>
          <motion.div className="absolute top-70 sm:top-72 md:top-145 lg:top-116 xl:top-[150px] right-9 sm:right-24 md:right-36 lg:right-54 xl:right-64 2xl:top-60 2xl:right-98 rotate-x-0 rotate-y-12" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.8 } }}>
            <EventCard title="Houdini Heist" />
          </motion.div>
          <motion.div className="absolute top-84 sm:top-28 md:top-116 lg:top-85 xl:top-70 right-20 sm:right-44 md:right-32 lg:right-62 xl:right-89 2xl:top-94" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 1.0 } }}>
            <EventCard title="Pixel Perfect" />
          </motion.div>
        </>
      )}

      <div className="pb-12 event -mt-12 sm:mt-40 md:-mt-24 lg:-mt-30 xl:-mt-28 2xl:-mt-28 text-center text-lg sm:text-xl md:text-3xl xl:text-2xl font-extrabold text-white">
        Drag to see magic 🪄✨
      </div>
    </div>


    

      </>

  );
};

const EventCard = ({ title }) => {
  return (
    <motion.div
      className="w-27 h-27 sm:w-32 sm:h-32 md:w-44 md:h-40 lg:w-55 lg:h-50 xl:w-48 xl:h-48 2xl:w-44 2xl:h-44 bg-contain bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${coordinate})`
      }}
    >
      <div className="absolute inset-0 -mt-4 sm:-mt-6 md:-mt-6 lg:-mt-8 xl:-mt-8 flex items-center justify-center bg-opacity-40 rounded-lg">
        <Link
          to={`/${title.toLowerCase().replace(/\s+/g, '')}`} 
          className="text-black font-extrabold text-center text-[9px] sm:text-base md:text-[15px] lg:text-[19px] xl:text-[16px] 2xl:text-[16px] event cursor-pointer"
        >
          {title}
        </Link>
      </div>
    </motion.div>
  );
};

export default FoldableMap;
