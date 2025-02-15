import { useState } from "react";
import backgroundImage from "../../assets/back.png";
import { motion } from "framer-motion";

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
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  if (!visible) return null;

  const handleNumChange = (e) => {
    const value = Math.min(3, Math.max(1, parseInt(e.target.value) || 1));
    setNumParticipants(value);
    setParticipants(Array(value).fill({ name: "", college: "", dept: "", phone: "", email: "" }));
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

    setError(""); 

    if (currentParticipant < numParticipants - 1) {
      setCurrentParticipant(currentParticipant + 1);
    } else {
      setStep(3);
    }
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
    data.append("upload_preset", "among_us_artimas");
    data.append("cloud_name", "doickrtde");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/doickrtde/image/upload", {
        method: "POST",
        body: data,
      });
      const uploadedImage = await res.json();
      setUploadedImageUrl(uploadedImage.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Failed to upload image. Try again.");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center event">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={imageVariants} 
        className="w-[540px] h-[540px] md:w-[600px] md:h-[600px] rounded-lg shadow-lg flex flex-col justify-center items-center relative p-4"
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
            <label className="block text-black text-sm md:text-lg font-bold mb-1">Number of Participants (Max 3):</label>
            <input
              type="number"
              min="1"
              max="3"
              value={numParticipants}
              onChange={handleNumChange}
              className="mt-4 bg-transparent border border-black rounded w-38 md:w-48 py-1 px-2 text-gray-700 focus:outline-none"
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
            <h3 className="text-black md:text-lg font-bold mb-2">Upload Payment Screenshot</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-black mb-2" />

            {paymentScreenshot ? (
              <p className="text-green-600 text-sm font-semibold">File selected: {paymentScreenshot.name}</p>
            ) : (
              <p className="text-red-500 text-sm font-semibold">Please upload a screenshot</p>
            )}

            {uploadedImageUrl && <p className="text-green-600 text-sm font-semibold">Uploaded successfully!</p>}

            <button className="w-64 md:w-72 mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded" onClick={handleFileUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Screenshot"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DDRegister;
