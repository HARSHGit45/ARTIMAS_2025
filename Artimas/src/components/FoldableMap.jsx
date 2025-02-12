import { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import coordinate from "../assets/coordinate.png";

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
    <div className="relative flex flex-col items-center">
      <div className="overflow-x-clip -mt-32 rotate-x-64 -rotate-y-4 rotate-z-5" style={{ perspective: "1000px" }}>
        <motion.div animate={isFolded ? "folded" : "open"} variants={{ open: { scale: 1 }, folded: { scale: 0.9 } }} initial="folded">
          <motion.div className="grid aspect-video h-[38vh] w-[50vh] md:w-[150vh] md:h-[138vh] relative">
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
                <motion.div className="absolute top-45 left-57 rotate-x-0 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}>
                  <EventCard title="HackMatrix" />
                </motion.div>
                <motion.div className="absolute top-78 left-150 -rotate-x-12 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.4 } }}>
                  <EventCard title="Datathon" />
                </motion.div>
                <motion.div className="absolute top-102 left-1/4 rotate-x-0 rotate-y-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.6 } }}>
                  <EventCard title="Among Us" />
                </motion.div>
                <motion.div className="absolute top-109 right-55 rotate-x-0 rotate-y-12" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.8 } }}>
                  <EventCard title="Houdini Heist" />
                </motion.div>
                <motion.div className="absolute top-47 right-103" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 1.0 } }}>
                  <EventCard title="Pixel Perfect" />
                </motion.div>
              </>
            )}

      <div className="event -mt-72 text-center text-xl font-semibold text-gray-800">
        Drag to see magic 🪄✨
      </div>
    </div>
  );
};

// Reusable Standing Event Card Component
const EventCard = ({ title }) => {
  return (
    <motion.div
      className="w-48 h-48 bg-contain bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${coordinate})`
      }}
    >
      <div className="absolute inset-0 -mt-7 flex items-center justify-center bg-opacity-40 rounded-lg ">
        <p className="text-black font-extrabold text-center text-lg event">{title}</p>
      </div>
    </motion.div>
  );
};

export default FoldableMap;
