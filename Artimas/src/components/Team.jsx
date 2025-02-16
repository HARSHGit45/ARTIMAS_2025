import { motion } from "framer-motion";
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import teamid from "/images/id_img.jpg"; // Replace with actual team images

const teamMembers = Array(10).fill({
  name: "John Doe",
  role: "Software Engineer",
  image: teamid, // Replace with dynamic images if available
  social: {
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
});

const Team = () => {
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
        bounce: 0.4,
      },
    },
  };

  return (
    <section className="event px-6 py-28 text-center" id="team">
      <h1 className="text-4xl md:text-6xl font-medium mb-4">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center rounded-2xl shadow-lg p-6 w-[40vh] h-[50vh] transition transform"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={projectVariants}
          >
            {/* Circular Profile Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Role */}
            <h2 className="mt-4 text-xl font-medium">{member.name}</h2>
            <p className="text-gray-500">{member.role}</p>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                <IoLogoLinkedin className="text-black text-2xl hover:text-blue-800 transition duration-300" />
              </a>
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                <GrGithub className="text-black text-2xl hover:text-blue-600 transition duration-300" />
              </a>
              <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-black text-2xl hover:text-black transition duration-300" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
