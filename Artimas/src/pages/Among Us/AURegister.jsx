import { useState } from "react";
import backgroundImage from "../../assets/back.png";
import qrCodeImage from "../../assets/50.jpg";
import { motion } from "framer-motion";
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

const AURegister = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [participant, setParticipant] = useState({ name: "", college: "", dept: "", phone: "", email: "" });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState("");
  const whatsappLink = "https://chat.whatsapp.com/HsMRzUSbaGw9apc6q2LW8o";
  let url = "";
  const emailRegex1 = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{2}@pccoepune\.org$/;
  const emailRegex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!visible) return null;

  const handleChange = (field, value) => {
    setParticipant({ ...participant, [field]: value });
  };

  const handleNextStep = () => {
    if (!participant.name || !participant.college || !participant.dept || !participant.phone || !participant.email) { 
      setError("All fields are required!");
      return;
    }
    else if(emailRegex1.test(participant.email) && phoneRegex.test(participant.phone)){
      handleSubmit();
      setStep(3);
    }
    else if (emailRegex2.test(participant.email) && phoneRegex.test(participant.phone)) {
      setStep(2);
      console.log(participant.email);
      console.log(emailRegex1.test(participant.email));
    }
    else{
      alert("Invalid Email or Phone Number");
    }
    setError("");
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/AmongUs/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: participant.name, college_name: participant.college, department: participant.dept, phone_number: participant.phone, email: participant.email, payment_ss: url }),
    });

    const result = await response.json();
    console.log("Registered Successfully!");
    console.log(result);
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
      url = uploadedImage.secure_url;
      setUploading(false);
      handleSubmit();
      setStep(3);
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
          <motion.div variants={textVariants} className="w-56 md:w-72 mt-2 md:mt-0">
            <h3 className="text-black event font-bold mb-1 md:mb-2">Participant Details</h3>
            <label className="block text-black text-sm md:text-md font-bold mb-1">Name:</label>
            <input type="text" value={participant.name} onChange={(e) => handleChange("name", e.target.value)} className="bg-transparent border border-black rounded w-full py-1 px-3 text-gray-700" />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">College:</label>
            <input type="text" value={participant.college} onChange={(e) => handleChange("college", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700" />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Dept:</label>
            <input type="text" value={participant.dept} onChange={(e) => handleChange("dept", e.target.value)} className="bg-transparent border border-black rounded w-full py-1 px-3 text-gray-700" />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Phone No:</label>
            <input type="text" value={participant.phone} onChange={(e) => handleChange("phone", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700" />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Email:</label>
            <input type="email" value={participant.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700" />

            {error && <div className="text-red-500 text-md font-bold mt-2">{error}</div>}

            <button className="w-full mt-1 md:mt-3 px-3 py-2 bg-[#004b23] text-white rounded" onClick={handleNextStep}>
              Proceed to Payment
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div variants={textVariants} className="w-64 md:w-72">
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
        {step === 3 && (
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
                  </motion.div>
                )}
      </motion.div>
    </div>
  );
};

export default AURegister;
