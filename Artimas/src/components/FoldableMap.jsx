import { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

import eventImg1 from '../assets/event.png';

const FoldableMap = () => {
  const xDrag = useMotionValue(0);
  const [isFolded, setIsFolded] = useState(true);

  const xLeftSection = useTransform(xDrag, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(xDrag, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  const centerBrightness = useTransform(xDrag, [150, 300], [0.2, 1]);

  useMotionValueEvent(xDrag, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  return (
    <div className="">
      <div
        className="  overflow-x-clip mt-72 rotate-x-58 -rotate-y-4 rotate-z-5"
        style={{ perspective: "1000px" }}>
        <motion.div
          animate={isFolded ? "folded" : "open"}
          variants={{
            open: { scale: 1 },
            folded: { scale: 0.9 },
          }}
          initial="folded"
          className="relative flex flex-col items-center"
        >
          <motion.div
            variants={{ open: { rotate: 0 }, hovering: { rotate: 0 } }}
            whileHover="hovering"
            initial={{ rotate: 3 }}
            className="grid aspect-video h-[38vh] w-[50vh] md:w-[100vh] md:h-[60vh] p-8 relative"
          >
            <div className="grid grid-cols-3 [grid-area:1/1]">
              <motion.div
                style={{ x: xLeftSection, skewY: "-1deg" }}
                className="map-image origin-bottom-right border-r border-[rgba(255,255,255,.1)] shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
              />

              <motion.div
                style={{
                  scaleX: centerScale,
                  "--brightness": centerBrightness,
                }}
                className="map-image brightness-[--brightness]"
              />

              <motion.div
                style={{ x: xRightSection, skewY: "1deg" }}
                className="map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-2xl"
              />
            </div>

            <motion.div
              drag="x"
              _dragX={xDrag}
              dragConstraints={{ left: 0, right: 300 }}
              dragTransition={{
                modifyTarget: (target) => (target > 150 ? 300 : 0),
                timeConstant: 45,
              }}
              className="relative z-10 cursor-grab [grid-area:1/1] active:cursor-grabbing"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial="folded"
        animate={isFolded ? "folded" : "open"}
        variants={{
          folded: {
            opacity: 0,
            scale: 0.9,
            y: -30,
          },
          open: {
            opacity: 1,
            scale: 1.2,
            y: -10,
          },
        }}
        className="mt-32 absolute top-0 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center" >
    
        <motion.div
          className=" w-52 h-52 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${eventImg1})` }} >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-sm">HackMatrix</p>
          </div>
        </motion.div>

        <motion.div
          className="w-52 h-52 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${eventImg1})` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-sm">Datathon</p>
          </div>
        </motion.div>

        <motion.div
          className="w-52 h-52 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${eventImg1})` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-center text-sm">Among Us</p>
          </div>
        </motion.div>

        <motion.div
          className="w-52 h-52 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${eventImg1})` }}>
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <p className="text-white text-center text-sm">Houdini Heist</p>
          </div>
        </motion.div>

        <motion.div
          className="w-52 h-52 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${eventImg1})` }}>
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <p className="text-white text-center text-sm">Pixel Perfect</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="event -mt-24 mr-8 text-center text-xl font-semibold text-gray-800">
        Drag to see magic 🪄✨
      </div>
    </div>
  );
};

export default FoldableMap;