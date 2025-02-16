import { useState } from "react";
import backgroundImage from "../../assets/back.png";
import { motion } from "framer-motion";
import qrCodeImage from "../../assets/180.jpg";

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

const HHRegister = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [participants, setParticipants] = useState(
    Array(3).fill({ name: "", college: "", dept: "", phone: "", email: "" })
  );
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState("");

  if (!visible) return null;

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

    if (currentParticipant < 2) {
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
    data.append("upload_preset", "houdini_heist");
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
            className="w-56 md:w-72 mt-2  md:mt-0">
            <h3 className="text-black event font-bold mb-1 md:mb-2">Participant {currentParticipant + 1}</h3>
            <input type="text" placeholder="Name" value={participants[currentParticipant]?.name || ""} onChange={(e) => handleChange("name", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700" />
<input type="text" placeholder="College" value={participants[currentParticipant]?.college || ""} onChange={(e) => handleChange("college", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700 mt-4" />
<input type="text" placeholder="Dept" value={participants[currentParticipant]?.dept || ""} onChange={(e) => handleChange("dept", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700 mt-4" />
<input type="text" placeholder="Phone No" value={participants[currentParticipant]?.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700 mt-4" />
<input type="email" placeholder="Email" value={participants[currentParticipant]?.email || ""} onChange={(e) => handleChange("email", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700 mt-4" />

            {error && <div className="text-red-500 text-md font-bold mt-2">{error}</div>}
            <button className="w-full mt-3 px-3 py-2 bg-[#ac2424] text-white rounded" onClick={handleNextParticipant}>
              {currentParticipant < 2 ? "Next Participant" : "Proceed to Payment"}
            </button>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div variants={textVariants} className="w-64 md:w-72">
            <h3 className="text-black md:text-lg font-bold mb-2">Scan QR & Upload Payment Screenshot</h3>
            <div className="flex justify-center mb-3">
              <img src={qrCodeImage} alt="Payment QR Code" className="w-40 h-40 border border-gray-400 rounded-lg shadow-md" />
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-black mb-2" />
            {paymentScreenshot ? <p className="text-green-600 text-sm font-semibold">File selected: {paymentScreenshot.name}</p> : <p className="text-red-500 text-sm font-semibold">Please upload a screenshot</p>}
            {uploadedImageUrl && <p className="text-green-600 text-sm font-semibold">Uploaded successfully!</p>}
            <button className="w-64 md:w-72 mt-2 px-4 py-2 bg-[#ac2424] text-white font-semibold rounded" onClick={handleFileUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Screenshot"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HHRegister;
