import { useState } from "react";
import backgroundImage from "../../assets/back.png";
import { motion } from "framer-motion";
import qrCodeImage from "../../assets/120.jpg"
import { FaWhatsapp } from "react-icons/fa";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { clipPath: "inset(50% 0 50% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};


const DDRegister = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [numParticipants, setNumParticipants] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [error, setError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const whatsappLink = "https://chat.whatsapp.com/HsMRzUSbaGw9apc6q2LW8o";
  let url = "";
  if (!visible) return null;

  const emailRegex1 = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{2}@pccoepune\.org$/;
  const emailRegex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleNumChange = (e) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setNumParticipants("");
      return;
    }


    const numValue = Math.min(2, Math.max(1, Number(value) || 1));

    setNumParticipants(numValue);
    setParticipants(Array(numValue).fill({ name: "", college: "", dept: "", phone: "", email: "" }));
  };


  const handleChange = (field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[currentParticipant] = {
      ...updatedParticipants[currentParticipant],
      [field]: value,
    };
    setParticipants(updatedParticipants);
  };

  const handleNextParticipant = () => {
    const currentData = participants[currentParticipant];

    if (!currentData.name || !currentData.college || !currentData.dept || !currentData.phone || !currentData.email) {
      setError("All fields are required!");
      return;
    }

    if (!phoneRegex.test(currentData.phone)) {
      alert("Invalid Phone Number");
      return;
    }

    if (!emailRegex1.test(currentData.email) && !emailRegex2.test(currentData.email)) {
      alert("Invalid Email");
      return;
    }

    if (currentParticipant < numParticipants - 1) {
      setCurrentParticipant(currentParticipant + 1);
    } else {
      // Check if all participants' emails match emailRegex1
      const allEmailsMatch = participants.every(participant => emailRegex1.test(participant.email));

      if (allEmailsMatch) {
        setStep(4);
      } else {
        setStep(3);
      }
    }

    setError("");
  };

  const handleSubmit = async () => {
    let postBody;
    if (numParticipants === 1) {
      postBody = JSON.stringify({ teamName: teamName, member1: { name: participants[0].name, college: participants[0].college, department: participants[0].dept, phone: participants[0].phone, email: participants[0].email }, payment_ss: url });
    }
    else {
      postBody = JSON.stringify({ teamName: teamName, member1: { name: participants[0].name, college: participants[0].college, department: participants[0].dept, phone: participants[0].phone, email: participants[0].email}, member2: { name: participants[1].name, college: participants[1].college, department: participants[1].dept, phone: participants[1].phone, email: participants[1].email }, payment_ss: url });
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Datathon/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postBody,
    });
    const result = await response.json();
    console.log("Registered Successfully!");
    console.log(result);
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!paymentScreenshot) {
      setError("Please select a file first.");
      return;
    }
    setUploading(true);
    const data = new FormData();
    data.append("file", paymentScreenshot);
    data.append("upload_preset", "datathon_gfg");
    data.append("cloud_name", "doickrtde");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/doickrtde/image/upload", {
        method: "POST",
        body: data,
      });
      const uploadedImage = await res.json();
      setUploadedImageUrl(uploadedImage.secure_url);
      url = uploadedImage.secure_url;
      setUploading(false);
      console.log(url);
      handleSubmit();
      setStep(4);
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Failed to upload image. Try again.");
      setUploading(false);
    }
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center event z-51">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        className="w-[540px] h-[540px] md:w-[600px] md:h-[600px] rounded-lg shadow-lg flex flex-col justify-center items-center relative p-4 md:mt-24"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        {step === 1 && (
          <motion.div
            variants={textVariants}
            className="mb-3 w-64 md:w-full flex flex-col items-center justify-center">
            <label className="block text-black text-sm md:text-lg font-bold mb-1">Number of Participants (Max 2):</label>
            <input
              type="text"

              value={numParticipants}
              onChange={handleNumChange}
              className="mt-4 bg-transparent border border-black rounded w-38 md:w-48 py-1 px-2 text-gray-700 focus:outline-none"
            />
            <label className="block text-black text-sm md:text-lg font-bold mb-1 mt-6">Team Name:</label>
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
              className="mt-3 bg-transparent border border-black rounded w-38 md:w-48 py-1 px-2 text-gray-700 focus:outline-none"
            />
            <button className="w-38 md:w-48 mt-3 px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setStep(2)}>
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            variants={textVariants}
            className="w-56 md:w-72 mt-2 md:mt-0">
            <h3 className="text-black event font-bold mb-1 md:mb-2">Participant {currentParticipant + 1}</h3>
            <label className="block text-black text-sm md:text-md font-bold md:mb-1">Name:</label>
            <input
              type="text"
              value={participants[currentParticipant]?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">College:</label>
            <input
              type="text"
              value={participants[currentParticipant]?.college || ""}
              onChange={(e) => handleChange("college", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Dept:</label>
            <input
              type="text"
              value={participants[currentParticipant]?.dept || ""}
              onChange={(e) => handleChange("dept", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Phone No:</label>
            <input
              type="text"
              value={participants[currentParticipant]?.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Email:</label>
            <input
              type="email"
              value={participants[currentParticipant]?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            {error && <div className="text-red-500 text-md font-bold mt-1 md:mt-2">{error}</div>}

            <button className="w-full mt-1 md:mt-3 px-3 py-2 bg-amber-400 text-white rounded" onClick={handleNextParticipant}>
              {currentParticipant < numParticipants - 1 ? "Next Participant" : "Proceed to Payment"}
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            variants={textVariants}
            className="w-64 md:w-72">
            <h3 className="text-black md:text-lg font-bold mb-2">Scan QR & Upload Payment Screenshot</h3>

            {/* QR Code Image */}


            <div className="flex justify-center mb-3">
              <img src={qrCodeImage} alt="Payment QR Code" className="w-40 h-40 border border-gray-400 rounded-lg shadow-md" />
            </div>

            <input type="file" accept="image/*" onChange={handleFileChange} className="text-black mb-2" />

            {paymentScreenshot ? (
              <p className="text-green-600 text-sm font-semibold">File selected: {paymentScreenshot.name}</p>
            ) : (
              <p className="text-red-500 text-sm font-semibold">Please upload a screenshot</p>
            )}

            {uploadedImageUrl && <p className="text-green-600 text-sm font-semibold">Uploaded successfully!</p>}

            <button className="w-64 md:w-72 mt-2 px-4 py-2 bg-[#ac2424] text-white font-semibold rounded" onClick={handleFileUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Screenshot"}
            </button>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            variants={textVariants}
            className="w-64 md:w-72">

            <h3 className="text-black md:text-lg font-bold mb-2">Registered Successfully....!</h3>
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <FaWhatsapp size={20} />
              Join WhatsApp Community
            </button>


            <button
            
            onClick={onClose}

             className="flex items-center gap-2 bg-blue-500  text-white px-4 py-2 rounded-lg mt-4">Close</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DDRegister;
