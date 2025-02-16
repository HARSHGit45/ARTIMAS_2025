import { motion } from "framer-motion";
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { TEAM } from "../constants";
import { useState } from "react";
import teamOpen from "../assets/team_open.jpg";

const Team = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const imageVariants = {
    hidden: { clipPath: "inset(50% 0 50% 0)" }, 
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

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

  return (
    <section className="event px-6 py-32 text-center mapbg" id="team">
      {/* Envelope Button */}
      {!isOpen && (
        <div className="flex flex-col items-center">
          <motion.div
            className="flex items-center justify-center p-6 shadow-lg cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            onClick={() => setIsOpen(true)}
          >
            <img src={teamOpen} className="w-96 h-96 object-cover rounded-sm" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-white text-lg font-semibold mt-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Click Here !
          </motion.p>
        </div>
      )}

      {/* Team Section with Smooth Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={isOpen ? "block" : "hidden"}
      >
        <h1 className="text-4xl text-white md:text-6xl font-medium mb-12">
          Our Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center teamid rounded-2xl shadow-lg p-6 w-[32vh] h-[39vh] md:w-[29vh] md:h-[39vh] lg:w-[250px] lg:h-auto xl:w-[280px] xl:h-auto 2xl:w-[320px] 2xl:h-auto transition transform"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={projectVariants}>

              <div className="w-24 h-24 md:w-24 md:h-24 xl:w-24 xl:h-24 mt-27 xl:mt-28 lg:mt-28 md:mt-22 2xl:mt-32 rounded-full overflow-hidden border-4 border-amber-950">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              
              <h2 className="mt-3 text-xl font-bold">{member.name}</h2>
              <p className="text-sm font-medium">{member.job}</p>

              <div className="flex gap-2 mt-1">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer">
                  <IoLogoLinkedin className="text-black text-2xl transition duration-300" />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaInstagram className="text-black text-2xl transition duration-300" />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <GrGithub className="text-black text-2xl transition duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Team;
