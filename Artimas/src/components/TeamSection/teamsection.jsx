import React from "react";
import "./teamsection.css"; // Import your existing CSS
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

// Sample team members (you can modify or fetch dynamically)
const teamMembers = [
  { id: 1, name: "My Nature", role: "Best Source", image: "/images/images.jpg" },
  { id: 2, name: "My Nature", role: "Best Source", image: "/images/images.jpg" },
  { id: 4, name: "My Nature", role: "Best Source", image: "/images/image2.jpeg" },
];

const Team = () => {
    return (
      <div className="container">
        {teamMembers.map((member) => (
          <div
            className="cards bg-contain bg-no-repeat rounded-2xl"
            key={member.id}
            style={{ backgroundImage: `url("/images/id_img.jpg")` }} // ✅ Background image
          >
            <div className="image">
              <img src={member.image} alt={member.name} /> {/* ✅ Profile image */}
            </div>
            <div className="content">
              <div className="details">
                <h2>
                  {member.name} <br />
                  <span>{member.role}</span>
                </h2>
                <ul className="social_icons">
                  <li>
                    <a href="#">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoLogoLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <GrGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default Team;
